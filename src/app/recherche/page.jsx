'use client';
import { useState } from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';

export default function RecherchePage() {
  const [form, setForm] = useState({
    depart: '',
    arrivee: '',
    temps: '',
    voiture: '',
    places: '',
    infos: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/recherche', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(res.ok ? '✅ Offre ajoutée avec succès !' : data.message || '❌ Une erreur est survenue');
  };

  return (
    <Container className="py-10 mt-10" >
      <div style={{ height: '100px' }}></div>
      <Form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-xl rounded-xl max-w-2xl mx-auto" 
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600"
          style={{ fontWeight: 'bold', fontFamily: 'cursive' }}>
          🚗 Nouvelle Poste Recherche de Covoiturage
        </h2>

        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="depart" label="Depart" className="mb-3" style={{ fontFamily: 'cursive' }}>
              <Form.Control
                name="depart"
                type="text"
                placeholder="Ville de départ"
                onChange={handleChange}
                required
                className="focus:ring focus:ring-blue-200"
                style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid #ccc', fontFamily: 'cursive' }}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="arrivee" label="arrivee" className="mb-3" style={{ fontFamily: 'cursive' }}>
              <Form.Control
                name="arrivee"
                type="text"
                placeholder="Ville d’arrivée"
                onChange={handleChange}
                required
                className="focus:ring focus:ring-blue-200"
                style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid #ccc', fontFamily: 'cursive' }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <FloatingLabel controlId="temps" label="" className="mb-3" style={{ fontFamily: 'cursive' }}>
          <Form.Control
            name="temps"
            type="datetime-local"
            onChange={handleChange}
            required
            className="focus:ring focus:ring-blue-200"
            style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid #ccc', fontFamily: 'cursive' }}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInfos" label="Informations supplémentaires" className="mb-4" style={{ fontFamily: 'cursive' }}>
          <Form.Control
            as="textarea"
            name="infos"
            style={{ height: '100px', backgroundColor: 'transparent', border: 'none', borderBottom: '2px solid #ccc', fontFamily: 'cursive' }}
            value={form.infos}
            onChange={handleChange}
            placeholder="Ex: Je souhaite être contacté par téléphone..."
            className="focus:ring focus:ring-blue-200"
          />
        </FloatingLabel>

        <Button
          variant="dark"
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition duration-300"
          style={{ fontFamily: 'cursive' }}
        >
          Publier
        </Button>
      </Form>
    </Container>
  );
}
