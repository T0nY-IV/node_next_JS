'use client';
import { useState } from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel, FormCheck } from 'react-bootstrap';

export default function OffrePage() {
  const [form, setForm] = useState({
    ModelVoiture: '',
    nbPlaceVal: '',
    bagage: false,
    prix: '',
    depart: '',
    destination: '',
    dateDebut: '',
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
    
    const annonceData = {
      ...form,
      nbPlaceVal: parseInt(form.nbPlaceVal),
      prix: parseFloat(form.prix),
      dateDebut: new Date(form.dateDebut),
    };

    try {
      const res = await fetch('http://localhost:5000/api/offre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(annonceData),
      });
      
      const data = await res.json();
      if (res.ok) {
        alert('✅ Offre ajoutée avec succès !');
        setForm({
          ModelVoiture: '',
          nbPlaceVal: '',
          bagage: false,
          prix: '',
          depart: '',
          destination: '',
          dateDebut: '',
          Remarque: '',
        });
      } else {
        throw new Error(data.message || 'Erreur lors de la création de l\'annonce');
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
          🚗 Nouvelle Offre de Covoiturage
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
          <Col>
            <FloatingLabel controlId="ModelVoiture" label="Modèle de voiture" className="mb-3">
              <Form.Control
                name="ModelVoiture"
                type="text"
                placeholder="Ex: Peugeot 208"
                value={form.ModelVoiture}
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
            <FloatingLabel controlId="nbPlaceVal" label="Places disponibles" className="mb-3">
              <Form.Control
                name="nbPlaceVal"
                type="number"
                min="1"
                placeholder="Nombre de places"
                value={form.nbPlaceVal}
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

        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="prix" label="Prix par passager" className="mb-3">
              <Form.Control
                name="prix"
                type="number"
                step="0.01"
                min="0"
                placeholder="Prix en €"
                value={form.prix}
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