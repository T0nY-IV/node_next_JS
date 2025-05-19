'use client';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Menu = () => {
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
    router.push('/login');
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      router.push('/compte');
    } else {
      router.push('/login');
    }
  };

  // Style global pour la police cursive
  const cursiveStyle = {
    fontFamily: 'cursive',
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
      className="shadow-sm"
      style={{
        zIndex: 9999,
        ...cursiveStyle
      }}
    >
      <Container fluid>
        {/* Logo/Brand centré */}
        <Navbar.Brand
          href="/"
          className="mx-auto mx-lg-0 me-lg-auto d-flex align-items-center"
          style={{
            fontSize: '1.25rem',
            ...cursiveStyle
          }}
        >
          <FaHome className="me-2" style={{ fontSize: '1.5rem' }} />
          <span className="d-none d-sm-inline">Accueil</span>
        </Navbar.Brand>

        {/* Bouton toggle pour mobile */}
        <Navbar.Toggle aria-controls="main-navbar" className="border-0" />

        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav className="align-items-lg-center">
            {isLoggedIn ? (
              <div 
                onClick={() => router.push('/compte')}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  transition: 'background-color 0.3s',
                  ':hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <Image 
                  src={user?.Image || '/default-avatar.png'} 
                  roundedCircle 
                  width={35}
                  height={35}
                  style={{ objectFit: 'cover' }}
                  alt="Photo de profil"
                />
                <span className="text-light">
                  {user?.Nom} {user?.Prenom}
                </span>
              </div>
            ) : (
              <div 
                onClick={handleAuthAction}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  padding: '8px 16px',
                  ...cursiveStyle
                }}
              >
                <i className="bi bi-person-circle me-1 d-none d-lg-inline"></i>
                Compte
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;