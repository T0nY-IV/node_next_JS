'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Acceuil() {
  // Style global pour la police cursive
  const cursiveStyle = {
    fontFamily: 'cursive',
  };

  return (
    <div style={{ position: 'relative', ...cursiveStyle }}>
      {/* Conteneur image avec superposition */}
      <div style={{ position: 'relative' }}>
        <img
          src="/logoV.png"
          alt="Tawssila"
          className="w-100"
          style={{
            height: '550px',
            marginTop: '0px',
            display: 'block',
            objectFit: 'cover',
          }}
        />
        
        {/* Bouton Ajouter un poste */}
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
        }}>
          <a
            href="/poste"
            className="btn btn-dark btn-lg px-5 py-3 fw-bold"
            style={{
              borderRadius: '50px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              fontSize: '1.2rem',
              textDecoration: 'none',
              ...cursiveStyle
            }}
          >
            Ajouter un poste
          </a>
        </div>

        {/* Section de recherche superposée */}
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '20px',
          ...cursiveStyle
        }}>
          <div className="d-flex justify-content-between align-items-end gap-3">
            {/* Filtre Poste */}
            <div style={{ flex: 1 }}>
              <label className="fw-bold mb-2" style={cursiveStyle}>Type de poste</label>
              <select 
                className="form-select"
                style={cursiveStyle}
              >
                <option>Recherche</option>
                <option>Offre</option>
              </select>
            </div>

            {/* Filtre Départ */}
            <div style={{ flex: 1 }}>
              <label className="fw-bold mb-2" style={cursiveStyle}>Départ</label>
              <select 
                className="form-select"
                style={cursiveStyle}
              >
                <option>Casablanca</option>
                <option>Rabat</option>
                <option>Marrakech</option>
              </select>
            </div>

            {/* Filtre Arrivée */}
            <div style={{ flex: 1 }}>
              <label className="fw-bold mb-2" style={cursiveStyle}>Arrivée</label>
              <select 
                className="form-select"
                style={cursiveStyle}
              >
                <option>Tanger</option>
                <option>Fès</option>
                <option>Agadir</option>
              </select>
            </div>

            {/* Bouton Recherche */}
            <div>
              <button 
                className="btn btn-dark py-2 px-4 fw-bold" 
                style={{ 
                  height: '42px',
                  ...cursiveStyle
                }}
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Espace pour le contenu suivant */}
      <div style={{ height: '50px' }}></div>
    </div>
  );
}