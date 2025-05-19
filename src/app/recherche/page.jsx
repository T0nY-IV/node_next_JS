'use client';
import { useState } from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';

export default function RecherchePage() {
  const [form, setForm] = useState({
    depart: '',
    destination: '',
    dateDebut: '',
    bagage: false,
    Remarque: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      alert('❌ Vous devez être connecté pour publier une recherche');
      return;
    }

    const annonceData = {
      ...form,
      dateDebut: new Date(form.dateDebut),
      userId: userData._id
    };

    try {
      const res = await fetch('http://localhost:3001/api/announce/ajoutRecherche', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(annonceData),
      });
      
      const data = await res.json();
      if (res.ok) {
        alert('✅ Recherche ajoutée avec succès !');
        setForm({
          depart: '',
          destination: '',
          dateDebut: '',
          bagage: false,
          Remarque: '',
        });
      } else {
        throw new Error(data.message || 'Erreur lors de la création de la recherche');
      }
    } catch (error) {
      alert(`❌ ${error.message}`);
    }
  };

  // Style global pour la police cursive
  const cursiveStyle = {
    fontFamily: 'cursive',
  };

  return (
    <Container className="py-10 mt-10" style={cursiveStyle}>
      <div style={{ height: '100px' }}></div>
      <Form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-xl rounded-xl max-w-2xl mx-auto"
        style={cursiveStyle}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          🔍 Nouvelle Recherche de Covoiturage
        </h2>

        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="depart" label="Départ" className="mb-3">
              <Form.Control
                name="depart"
                type="text"
                placeholder="Ville de départ"
                value={form.depart}
                onChange={handleChange}
                required
                className="focus:ring focus:ring-blue-200"
                style={{ 
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  borderBottom: '2px solid #ccc',
                  fontFamily: 'cursive'
                }}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="destination" label="Destination" className="mb-3">
              <Form.Control
                name="destination"
                type="text"
                placeholder="Ville d'arrivée"
                value={form.destination}
                onChange={handleChange}
                required
                className="focus:ring focus:ring-blue-200"
                style={{ 
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  borderBottom: '2px solid #ccc',
                  fontFamily: 'cursive'
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <FloatingLabel controlId="dateDebut" label="Date et heure de départ" className="mb-3">
          <Form.Control
            name="dateDebut"
            type="datetime-local"
            value={form.dateDebut}
            onChange={handleChange}
            required
            className="focus:ring focus:ring-blue-200"
            style={{ 
              backgroundColor: 'transparent', 
              border: 'none', 
              borderBottom: '2px solid #ccc',
              fontFamily: 'cursive'
            }}
          />
        </FloatingLabel>

        <Row className="mb-3">
          <Col className="d-flex align-items-center">
            <Form.Check 
              type="checkbox"
              id="bagage"
              label="Bagage autorisé"
              name="bagage"
              checked={form.bagage}
              onChange={handleChange}
              className="mt-3"
              style={cursiveStyle}
            />
          </Col>
        </Row>

        <FloatingLabel controlId="Remarque" label="Informations supplémentaires" className="mb-4">
          <Form.Control
            as="textarea"
            name="Remarque"
            style={{ 
              height: '100px', 
              backgroundColor: 'transparent', 
              border: 'none', 
              borderBottom: '2px solid #ccc',
              fontFamily: 'cursive'
            }}
            value={form.Remarque}
            onChange={handleChange}
            placeholder="Ex: Je souhaite être contacté par téléphone..."
            className="focus:ring focus:ring-blue-200"
          />
        </FloatingLabel>

        <Button
          variant="dark"
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition duration-300"
          style={cursiveStyle}
        >
          Publier
        </Button>
      </Form>
    </Container>
  );
}
