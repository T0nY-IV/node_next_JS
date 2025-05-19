'use client';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    Cin: '',
    Nom: '',
    Prenom: '',
    Email: '',
    Password: '',
    Role: 'user',
    gender: '',
    Image: null,
  });
  const [preview, setPreview] = useState(null);

  // Style global pour la police cursive
  const cursiveStyle = {
    fontFamily: 'cursive',
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, Image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // First, upload the image if it exists
      let imageUrl = null;
      if (form.Image) {
        const imageData = new FormData();
        imageData.append('file', form.Image);
        imageData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset
        
        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: imageData
        });
        
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      }

      // Then send the user data
      const userData = {
        ...form,
        Image: imageUrl
      };

      const res = await fetch('http://localhost:3001/api/user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await res.json();
      if (res.ok) {
        alert('Inscription réussie !');
        window.location.href = '/login';
      } else {
        alert(result.message || 'Erreur');
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
          Inscription
        </h2>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <FloatingLabel controlId="floatingNom" label="Nom" className="mb-3">
                <Form.Control 
                  type="text" 
                  name="Nom" 
                  value={form.Nom} 
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

              <FloatingLabel controlId="floatingPrenom" label="Prénom" className="mb-3">
                <Form.Control 
                  type="text" 
                  name="Prenom" 
                  value={form.Prenom} 
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

              <FloatingLabel controlId="floatingCin" label="CIN" className="mb-3">
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

              <div className="d-flex justify-content-end">
                <Button 
                  variant="secondary" 
                  onClick={() => setStep(2)}
                  style={cursiveStyle}
                >
                  Suivant <i className="bi bi-arrow-right"></i>
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                <Form.Control 
                  type="email" 
                  name="Email" 
                  value={form.Email} 
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

              <FloatingLabel controlId="floatingPassword" label="Mot de passe" className="mb-3">
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

              <Form.Group className="mb-3 d-flex" style={cursiveStyle}>
                <Form.Label>Genre</Form.Label>
                <div>
                  <Form.Check 
                    className="ms-3"
                    type="radio" 
                    label="Homme" 
                    name="gender"
                    value="homme" 
                    checked={form.gender === 'homme'} 
                    onChange={handleChange} 
                    inline
                    style={cursiveStyle}
                  />
                  <Form.Check
                    type="radio" 
                    label="Femme" 
                    name="gender" 
                    value="femme"
                    checked={form.gender === 'femme'} 
                    onChange={handleChange} 
                    inline
                    style={cursiveStyle}
                  />
                </div>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button 
                  variant="secondary" 
                  onClick={() => setStep(1)}
                  style={cursiveStyle}
                >
                  <i className="bi bi-arrow-left"></i> Précédent
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setStep(3)}
                  style={cursiveStyle}
                >
                  Suivant <i className="bi bi-arrow-right"></i>
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <Form.Group className="mb-3" style={cursiveStyle}>
                <Form.Label>Avatar</Form.Label>
                <Form.Control 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  style={cursiveStyle}
                />
                {preview && (
                  <div className="mt-3 text-center">
                    <Image 
                      src={preview} 
                      alt="Aperçu avatar" 
                      width={100} 
                      height={100} 
                      className="rounded-circle" 
                    />
                  </div>
                )}
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button 
                  variant="secondary" 
                  onClick={() => setStep(2)}
                  style={cursiveStyle}
                >
                  <i className="bi bi-arrow-left"></i> Précédent
                </Button>
                <Button 
                  variant="success" 
                  type="submit"
                  style={cursiveStyle}
                >
                  S'inscrire
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}