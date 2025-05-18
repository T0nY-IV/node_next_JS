'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserCard from '@/component/UserCard';
import PostCard from '@/component/PostCard';
import { Card, Button } from 'react-bootstrap';

export default function User() {
    // Style global pour la police cursive
    const cursiveStyle = {
        fontFamily: 'cursive',
    };

    return (
        <div style={cursiveStyle}>
            {/* Espacement en haut */}
            <div style={{ height: '100px' }}></div>
            
            {/* Section double carte (Utilisateur + Connexion) */}
            <div className="d-flex justify-content-center gap-4 mb-5">
                {/* Carte Utilisateur */}
                <div style={{ width: '700px' }}>
                    <UserCard />
                </div>
                
                {/* Carte Connexion/Inscription */}
                <Card style={{ 
                    width: '400px', 
                    height: 'fit-content',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <Card.Body className="text-center p-4">
                        
                        <Card.Text className="mb-4">
                            Connectez-vous ou créez un compte pour accéder à toutes les fonctionnalités.
                        </Card.Text>
                        
                        <div className="d-grid gap-3">
                            <Button 
                                variant="dark" 
                                size="lg"
                                style={{
                                    borderRadius: '50px',
                                    padding: '10px',
                                    fontWeight: 'bold'
                                }}
                            >
                                    <a href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Se connecter</a>
                            </Button>
                            
                            <Button 
                                variant="outline-secondary" 
                                size="lg"
                                style={{
                                    borderRadius: '50px',
                                    padding: '10px',
                                    fontWeight: 'bold',
                                    borderWidth: '2px'
                                }}
                            >
                                <a href="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>S'inscrire</a>
                                
                            </Button>
                        </div>
                        
                        <div className="mt-4 pt-3 border-top">
                            <small className="text-muted">
                                En continuant, vous acceptez nos conditions d'utilisation.
                            </small>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            
            {/* Section Filtres et Actions */}
            <div style={{
                margin: '0 auto 40px',
                width: 'calc(700px + 400px + 32px)', // Somme des largeurs + gap
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '20px',
            }}>
                <div className="d-flex justify-content-between align-items-end gap-3">
                    {/* Filtre Poste */}
                    <div style={{ flex: 1 }}>
                        <label className="fw-bold mb-2">Type de poste</label>
                        <select className="form-select">
                            <option>Recherche</option>
                            <option>Offre</option>
                        </select>
                    </div>

                    {/* Filtre Départ */}
                    <div style={{ flex: 1 }}>
                        <label className="fw-bold mb-2">Départ</label>
                        <select className="form-select">
                            <option>Casablanca</option>
                            <option>Rabat</option>
                            <option>Marrakech</option>
                        </select>
                    </div>

                    {/* Filtre Arrivée */}
                    <div style={{ flex: 1 }}>
                        <label className="fw-bold mb-2">Arrivée</label>
                        <select className="form-select">
                            <option>Tanger</option>
                            <option>Fès</option>
                            <option>Agadir</option>
                        </select>
                    </div>

                    {/* Bouton Recherche */}
                    <div>
                        <button className="btn btn-dark py-2 px-4 fw-bold" style={{ height: '42px' }}>
                            Rechercher
                        </button>
                    </div>
                </div>
                
                {/* Bouton Ajouter un poste - Centré sous les filtres */}
                <div className="text-center mt-4">
                    <a
                        href="/poste"
                        className="btn btn-dark btn-lg px-5 py-3 fw-bold"
                        style={{
                            borderRadius: '50px',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                            fontSize: '1.2rem',
                            textDecoration: 'none',
                        }}
                    >
                        Ajouter un poste
                    </a>
                </div>
            </div>
            
            {/* Séparateur */}
            <hr className="my-5" />
            
            {/* Section Historique des postes */}
            <div className="container">
                <h2 className="text-center mb-4">Historique des postes</h2>
                <PostCard isUserPage={true}/>
            </div>
        </div>
    );
}