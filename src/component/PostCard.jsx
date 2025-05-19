'use client';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCar, FaSearch, FaTrash } from 'react-icons/fa';

export default function PostCard({ isUserPage = false }) {
  const [announces, setAnnounces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Style global pour la police cursive
  const cursiveStyle = {
    fontFamily: 'cursive',
  };

  useEffect(() => {
    fetchAnnounces();
  }, []);

  const fetchAnnounces = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };
      
      // Si c'est la page utilisateur, on récupère uniquement ses annonces
      const endpoint = isUserPage 
        ? 'http://localhost:3001/api/announce/user'
        : 'http://localhost:3001/api/announce/all';
      
      console.log('Fetching from endpoint:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des annonces');
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      if (!Array.isArray(data)) {
        throw new Error('Format de données invalide');
      }
      
      setAnnounces(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur détaillée:', error);
      setError(error.message || 'Une erreur est survenue lors de la récupération des annonces');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vous devez être connecté pour supprimer une annonce');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/announce/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la suppression de l\'annonce');
      }

      setAnnounces(announces.filter(announce => announce._id !== id));
      alert('Annonce supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert(error.message);
    }
  };

  const handleReserve = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vous devez être connecté pour réserver');
        return;
      }
      const response = await fetch(`http://localhost:3001/api/announce/reserve/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la réservation');
      }
      const updatedAnnounce = await response.json();
      setAnnounces(announces.map(a => a._id === id ? updatedAnnounce : a));
      alert('Réservation effectuée !');
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-2">Chargement des annonces...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Erreur!</h4>
          <p>{error}</p>
          <button 
            className="btn btn-outline-danger mt-2"
            onClick={fetchAnnounces}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (announces.length === 0) {
    return (
      <div className="text-center p-4">
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">Aucune annonce disponible</h4>
          <p>Il n'y a actuellement aucune annonce à afficher.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {announces.map((announce) => (
        <div 
          key={announce._id}
          className="card mb-4 mt-4" 
          style={{ 
            width: '700px', 
            margin: '0 auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            ...cursiveStyle
          }}
        >
          {/* En-tête avec photo de profil et nom */}
          <div className="d-flex flex-column align-items-center pt-3">
            <img 
              src={announce.userId?.Image || '/default-avatar.png'} 
              alt="User" 
              className="rounded-circle" 
              style={{ 
                width: '60px', 
                height: '60px', 
                objectFit: 'cover',
                border: '2px solid #f8f9fa'
              }}
            />
            <h5 
              className="mt-2 mb-0"
              style={{
                fontWeight: 'bold',
                ...cursiveStyle
              }}
            >
              {announce.userId?.Nom} {announce.userId?.Prenom}
            </h5>
          </div>

          {/* Contenu du post */}
          <div 
            className="card-body"
            style={cursiveStyle}
          >
            <div className="d-flex align-items-center mb-3">
              {announce.type_poste === 'offre' ? (
                <FaCar className="text-primary me-2" />
              ) : (
                <FaSearch className="text-success me-2" />
              )}
              <h6 className="mb-0">
                {announce.type_poste === 'offre' ? 'Offre de covoiturage' : 'Recherche de covoiturage'}
              </h6>
            </div>

            <div className="mb-3">
              <p className="mb-1">
                <strong>Départ:</strong> {announce.depart}
              </p>
              <p className="mb-1">
                <strong>Destination:</strong> {announce.destination}
              </p>
              <p className="mb-1">
                <strong>Date:</strong> {new Date(announce.dateDebut).toLocaleString()}
              </p>
              {announce.type_poste === 'offre' && (
                <>
                  <p className="mb-1">
                    <strong>Modèle de voiture:</strong> {announce.ModelVoiture}
                  </p>
                  <p className="mb-1">
                    <strong>Places disponibles:</strong> {announce.nbPlaceVal}
                  </p>
                  <p className="mb-1">
                    <strong>Prix:</strong> {announce.prix} DH
                  </p>
                </>
              )}
              {announce.bagage && (
                <p className="mb-1">
                  <strong>Bagage autorisé</strong>
                </p>
              )}
              {announce.Remarque && (
                <p className="mb-1">
                  <strong>Remarque:</strong> {announce.Remarque}
                </p>
              )}
            </div>
          </div>

          {/* Bouton Réserver/Supprimer */}
          <div className="card-footer bg-white border-0">
            <div className="d-flex justify-content-end">
              {isUserPage ? (
                <button 
                  className="btn btn-dark"
                  onClick={() => handleDelete(announce._id)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: '20px',
                    ...cursiveStyle
                  }}
                >
                  <FaTrash className="me-2" />
                  Effacer
                </button>
              ) : (
                announce.type_poste === 'offre' && (
                  <button
                    className="btn btn-dark"
                    onClick={() => handleReserve(announce._id)}
                    style={{
                      padding: '8px 24px',
                      borderRadius: '20px',
                      ...cursiveStyle
                    }}
                    disabled={announce.nbPlaceVal <= 0}
                  >
                    {announce.nbPlaceVal <= 0 ? 'Complet' : 'Réserver'}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}