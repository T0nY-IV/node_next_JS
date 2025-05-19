'use client';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function LoginPage() {
  const [form, setForm] = useState({ Cin: '', Password: '' });

  // Style global pour la police cursive
  const cursiveStyle = {
    fontFamily: 'cursive',
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.User));
        window.location.href = '/';
      } else {
        alert(data.message || 'Erreur');
      }
    } catch (err) {
      alert('Erreur serveur');
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center min-vh-100" 
      style={{ 
        marginTop: '0px', 
        backgroundColor: '#f0f0f0',
        ...cursiveStyle 
      }}
    >
      <div 
        className="p-4 border rounded shadow" 
        style={{ 
          width: '100%', 
          maxWidth: '450px',
          ...cursiveStyle 
        }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>
          Connection
        </h2>

        <form onSubmit={handleSubmit}>
          <FloatingLabel 
            controlId="floatingCin" 
            label="CIN" 
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="Cin"
              value={form.Cin}
              onChange={handleChange}
              required
              style={{ 
                backgroundColor: 'transparent', 
                border: 'none', 
                borderBottom: '2px solid #ccc',
                ...cursiveStyle
              }}
            />
          </FloatingLabel>

          <FloatingLabel 
            controlId="floatingPassword" 
            label="Mot de passe" 
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="Password"
              value={form.Password}
              onChange={handleChange}
              required
              style={{ 
                backgroundColor: 'transparent', 
                border: 'none', 
                borderBottom: '2px solid #ccc',
                ...cursiveStyle
              }}
            />
          </FloatingLabel>

          <div className="d-flex justify-content-center">
            <Button 
              variant="success" 
              type="submit"
              style={cursiveStyle}
            >
              Se connecter
            </Button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <p>Vous n'avez pas de compte ? </p><a href="/signup" style={cursiveStyle}>S'inscrire</a>
          </div>
        </form>
      </div>
    </div>
  );
}