'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { BiCar, BiSearchAlt } from 'react-icons/bi';
import { FiArrowRight } from 'react-icons/fi';

export default function AjouterPoste() {
  const [typePoste, setTypePoste] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typePoste === 'offre') {
      router.push('/offre');
    } else if (typePoste === 'recherche') {
      router.push('/recherche');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4" style={{ fontFamily: 'cursive' }}>
                <h2 className="fw-bold" >Type d'annonce</h2>
                <p className="text-muted ff-cursive">Sélectionnez le type d'annonce que vous souhaitez créer</p>
              </div>

              <Form onSubmit={handleSubmit} style={{ fontFamily: 'cursive' }}>
                <div className="mb-4">
                  <Form.Check 
                    type="radio"
                    id="offre"
                    name="typePoste"
                    label={
                      <div className="d-flex align-items-center">
                        <BiCar className="fs-3 me-2 text-primary" />
                        <div>
                          <span className="d-block fw-medium">Je propose un trajet</span>
                          <small className="text-muted">(Offre de covoiturage)</small>
                        </div>
                      </div>
                    }
                    value="offre"
                    checked={typePoste === 'offre'}
                    onChange={() => setTypePoste('offre')}
                    className="p-3 mb-2 border rounded"
                  />

                  <Form.Check 
                    type="radio"
                    id="recherche"
                    name="typePoste"
                    label={
                      <div className="d-flex align-items-center">
                        <BiSearchAlt className="fs-3 me-2 text-success" />
                        <div>
                          <span className="d-block fw-medium">Je cherche un trajet</span>
                          <small className="text-muted">(Recherche de covoiturage)</small>
                        </div>
                      </div>
                    }
                    value="recherche"
                    checked={typePoste === 'recherche'}
                    onChange={() => setTypePoste('recherche')}
                    className="p-3 border rounded"
                  />
                </div>

                <Button 
                  variant="dark" 
                  type="submit" 
                  size="lg"
                  className="w-100 fw-bold"
                  disabled={!typePoste}
                  style={{ fontFamily: 'cursive' }}
                >
                  Continuer <FiArrowRight className="ms-2" />
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}