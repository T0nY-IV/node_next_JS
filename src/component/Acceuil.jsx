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
      </div>
      {/* Espace pour le contenu suivant */}
      <div style={{ height: '50px' }}></div>
    </div>
  );
}