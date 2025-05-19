'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserCard from '@/component/UserCard';
import PostCard from '@/component/PostCard';
import { Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function User() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        router.push('/');
    };

    // Style global pour la police cursive
    const cursiveStyle = {
        fontFamily: 'cursive',
    };

    return (
        <div style={cursiveStyle}>
            {/* Espacement en haut */}
            <div style={{ height: '50px' }}></div>

            {/* Section double carte (Utilisateur + Connexion) */}
            <div className="container mt-5">
                <div className="row justify-content-center align-items-start">
                    {/* Carte utilisateur */}
                    <div className="col-md-7 ">
                        <UserCard />
                    </div>
                    {/* Carte connexion/ajout */}
                    <div className="col-md-5 mb-4 ">
                        {!isLoggedIn ? (
                            <Card style={{
                                width: '400px',
                                height: 'fit-content',
                                borderRadius: '15px',
                                //boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }} className="shadow-lg">
                                <Card.Body className="text-center p-4">
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
                                    </div>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Card style={{
                                width: '400px',
                                height: 'fit-content',
                                borderRadius: '15px',
                                //boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }} className="shadow-lg">
                                <Card.Body className="text-center p-4">
                                    <Card.Text className="mb-5">
                                        Bienvenue {user?.Nom} {user?.Prenom}
                                    </Card.Text>

                                    <div className="d-grid gap-3">
                                        <Button
                                            variant="dark"
                                            size="lg"
                                            onClick={handleLogout}
                                            style={{
                                                borderRadius: '50px',
                                                padding: '10px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Se déconnecter
                                        </Button>
                                    </div>
                                    <div className="text-center mt-5">
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
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* Séparateur */}
            <hr className="my-5" />

            {/* Section Historique des postes */}
            <div className="container">
                <h2 className="text-center mb-4">Historique des postes</h2>
                <PostCard isUserPage={true} />
            </div>
        </div>
    );
}