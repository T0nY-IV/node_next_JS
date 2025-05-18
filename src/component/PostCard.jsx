'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PostCard({ isUserPage = false }) {
  // Style global pour la police cursive
  const cursiveStyle = {
    fontFamily: 'cursive',
  };

  return (
    <div 
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
          src="/1.jpg" 
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
          Nom Utilisateur
        </h5>
      </div>

      {/* Contenu du post */}
      <div 
        className="card-body"
        style={cursiveStyle}
      >
        <p className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
          Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
          rhoncus ut eleifend nibh porttitor.
        </p>
      </div>

      {/* Bouton Réserver */}
      <div className="card-footer bg-white border-0">
        <div className="d-flex justify-content-end">
          <button 
            className="btn btn-dark"
            style={{
              padding: '8px 24px',
              borderRadius: '20px',
              ...cursiveStyle
            }}
          >
            {isUserPage ? 'Effacer' : 'Réserver'}
          </button>
        </div>
      </div>
    </div>
  );
}