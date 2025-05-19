import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Form, Image, Row, Col, Modal } from 'react-bootstrap';

const UserCard = () => {
  // État initial
  const [user, setUser] = useState({
    Nom: '',
    Prenom: '',
    Cin: '',
    Email: '',
    Image: '/default-avatar.png' // Image par défaut depuis le dossier public
  });

  const [editMode, setEditMode] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        Nom: parsedUser.Nom || '',
        Prenom: parsedUser.Prenom || '',
        Cin: parsedUser.Cin || '',
        Email: parsedUser.Email || '',
        Image: parsedUser.Image || '/default-avatar.png'
      });
    }
  }, []);

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
      setUser(prev => ({ ...prev, Image: previewImage }));
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

  // Sauvegarder les modifications
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vous devez être connecté pour modifier votre profil');
        return;
      }

      // Préparer les données à envoyer
      const userData = {
        ...user,
        // Ne pas envoyer l'image si c'est l'image par défaut
        Image: user.Image === '/default-avatar.png' ? null : user.Image
      };

      const response = await fetch('http://localhost:3001/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        // Mettre à jour le localStorage avec les nouvelles données
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setEditMode(false);
        alert('Profil mis à jour avec succès !');
      } else {
        throw new Error(data.message || 'Erreur lors de la mise à jour du profil');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(error.message || 'Erreur lors de la mise à jour du profil');
    }
  };

  // Basculer entre mode édition et visualisation
  const toggleEdit = () => {
    if (editMode) {
      handleSave();
    } else {
      setEditMode(true);
    }
  };

  return (
    <div className="d-flex justify-content-center ">
      <Card style={{ width: '700px', borderRadius: '15px',padding: '20px' }} className="shadow-lg">
        <Card.Body>
          <Row>
            {/* Colonne pour l'image */}
            <Col md={4} className="d-flex flex-column align-items-center">
              <div className="position-relative">
                <Image 
                  src={user.Image || '/default-avatar.png'} 
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
                      name="Nom"
                      value={user.Nom}
                      onChange={handleChange}
                      placeholder="Entrez votre nom"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      type="text"
                      name="Prenom"
                      value={user.Prenom}
                      onChange={handleChange}
                      placeholder="Entrez votre prénom"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>CIN</Form.Label>
                    <Form.Control
                      type="text"
                      name="Cin"
                      value={user.Cin}
                      onChange={handleChange}
                      placeholder="Entrez votre CIN"
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      value={user.Email}
                      onChange={handleChange}
                      placeholder="Entrez votre email"
                    />
                  </Form.Group>
                </Form>
              ) : (
                // Mode visualisation
                <div>
                  <div className="mb-3">
                    <p className="mb-1"><strong className="text-secondary">Nom:</strong> <span className="fs-5">{user.Nom}</span></p>
                    <p className="mb-1"><strong className="text-secondary">Prénom:</strong> <span className="fs-5">{user.Prenom}</span></p>
                    <p className="mb-1"><strong className="text-secondary">CIN:</strong> <span className="fs-5">{user.Cin}</span></p>
                    <p className="mb-1"><strong className="text-secondary">Email:</strong> <span className="fs-5">{user.Email}</span></p>
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
            className="mb-3"
            alt="Prévisualisation"
          />
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