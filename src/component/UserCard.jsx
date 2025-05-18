import React, { useState, useRef } from 'react';
import { Card, Button, Form, Image, Row, Col, Modal } from 'react-bootstrap';

const UserCard = () => {
  // État initial
  const [user, setUser] = useState({
    nom: 'Dupont',
    prenom: 'Jean',
    cin: 'AB123456',
    email: 'jean.dupont@example.com',
    image: '1.jpg' // Chemin par défaut ou URL
  });

  const [editMode, setEditMode] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // Gestionnaire de changement pour les champs texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  // Gestionnaire de changement pour l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setShowImageModal(true);
    }
  };

  // Confirmer le changement d'image
  const confirmImageChange = () => {
    if (previewImage) {
      setUser(prev => ({ ...prev, image: previewImage }));
    }
    setShowImageModal(false);
  };

  // Annuler le changement d'image
  const cancelImageChange = () => {
    setPreviewImage(null);
    setShowImageModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Basculer entre mode édition et visualisation
  const toggleEdit = () => {
    if (editMode) {
      // Ici vous pourriez ajouter une logique pour sauvegarder les modifications
      console.log('Données sauvegardées:', user);
    }
    setEditMode(!editMode);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: '700px', borderRadius: '15px',padding: '20px' }} className="shadow-lg">
        <Card.Body>
          <Row>
            {/* Colonne pour l'image */}
            <Col md={4} className="d-flex flex-column align-items-center">
              <div className="position-relative">
                <Image 
                  src={user.image} 
                  roundedCircle 
                  width={150}
                  height={150}
                  className="mb-3 border object-fit-cover"
                  alt="Photo de profil"
                  style={{ border: '3px solid #dee2e6' }}
                />
                {editMode && (
                  <Button 
                    variant="outline-secondary"
                    size="sm"
                    className="position-absolute bottom-0 end-0 rounded-circle"
                    style={{ width: '35px', height: '35px' }}
                    onClick={() => fileInputRef.current.click()}
                    title="Changer la photo"
                  >
                    <i className="bi bi-camera"></i>
                  </Button>
                )}
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              <Button 
                variant={editMode ? "dark" : "dark"} 
                onClick={toggleEdit}
                className="mt-2"
                style={{ minWidth: '120px' }}
              >
                {editMode ? (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Enregistrer
                  </>
                ) : (
                  <>
                    <i className="bi bi-pencil-square me-2"></i>
                    Modifier
                  </>
                )}
              </Button>
            </Col>

            {/* Colonne pour les informations */}
            <Col md={8}>
              {editMode ? (
                // Mode édition
                <Form>
                  <h4 className="mb-4 text-primary">Modifier le profil</h4>
                  <Form.Group className="mb-3">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      type="text"
                      name="nom"
                      value={user.nom}
                      onChange={handleChange}
                      placeholder="Entrez votre nom"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      name="prenom"
                      value={user.prenom}
                      onChange={handleChange}
                      placeholder="Entrez votre prénom"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>CIN</Form.Label>
                    <Form.Control
                      type="text"
                      name="cin"
                      value={user.cin}
                      onChange={handleChange}
                      placeholder="Entrez votre CIN"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      placeholder="Entrez votre email"
                    />
                  </Form.Group>
                </Form>
              ) : (
                // Mode visualisation
                <div>
                  
                  <div className="mb-3">
                    <p className="mb-1"><strong className="text-secondary">Nom:</strong> <span className="fs-5">{user.nom}</span></p>
                    <p className="mb-1"><strong className="text-secondary">Prénom:</strong> <span className="fs-5">{user.prenom}</span></p>
                    <p className="mb-1"><strong className="text-secondary">CIN:</strong> <span className="fs-5">{user.cin}</span></p>
                    <p className="mb-1"><strong className="text-secondary">Email:</strong> <span className="fs-5">{user.email}</span></p>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal de prévisualisation de l'image */}
      <Modal show={showImageModal} onHide={cancelImageChange} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la nouvelle photo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image 
            src={previewImage} 
            roundedCircle 
            width={200}
            height={200}
            className="mb-3 border object-fit-cover"
            alt="Nouvelle photo de profil"
          />
          <p>Voulez-vous utiliser cette photo comme nouvelle image de profil ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelImageChange}>
            Annuler
          </Button>
          <Button variant="primary" onClick={confirmImageChange}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserCard;