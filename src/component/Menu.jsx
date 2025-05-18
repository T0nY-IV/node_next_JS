'use client';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';

const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Style global pour la police cursive
  const cursiveStyle = {
    fontFamily: 'cursive',
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Logique de déconnexion
      setIsLoggedIn(false);
      // Ajoutez ici d'autres actions de déconnexion si nécessaire
    } else {
      // Redirection vers la page de login
      window.location.href = '/compte';
    }
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
              <Button
                variant="outline-light"
                onClick={handleAuthAction}
                className="d-flex align-items-center"
                style={cursiveStyle}
              >
                <FaSignOutAlt className="me-2" />
                Se déconnecter
              </Button>
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