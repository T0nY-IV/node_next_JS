const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Public routes
router.post('/', async (req, res) => {
    const { Cin, Nom, Prenom, Email, Password, gender, Image } = req.body; 
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ Cin });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        let imageUrl = null;
        if (Image) {
            const result = await cloudinary.uploader.upload(Image); 
            imageUrl = result.secure_url; 
        }

        const newUser = new User({
            Cin,
            Nom,
            Prenom,
            Email,
            Password: hashedPassword,
            Role: 'user',
            gender,
            Image: imageUrl 
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findOne({Cin: userId});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
});

router.post('/login', async (req, res) => {
    const { Cin, Password } = req.body;
    try {
        if (!Cin || !Password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const user = await User.findOne({ Cin });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = generationToken(user);
        res.status(200).json({ success: true, token, User: user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Protected routes
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findOne({ Cin: req.user.Cin }).select('-Password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/update', auth, async (req, res) => {
    const { Nom, Prenom, Email, Password, Image } = req.body;
    try {
        const user = await User.findOne({ Cin: req.user.Cin });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (Password) {
            const salt = await bcrypt.genSalt(10);
            user.Password = await bcrypt.hash(Password, salt);
        }

        if (Image) {
            const result = await cloudinary.uploader.upload(Image);
            user.Image = result.secure_url;
        }

        user.Nom = Nom || user.Nom;
        user.Prenom = Prenom || user.Prenom;
        user.Email = Email || user.Email;

        await user.save();
        
        // Renvoyer l'utilisateur mis à jour sans le mot de passe
        const updatedUser = await User.findOne({ Cin: req.user.Cin }).select('-Password');
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Admin routes
router.get('/all', auth, async (req, res) => {
    try {
        if (req.user.Role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const users = await User.find({}, '-Password').sort({ "_id": -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const generationToken = (user) => {
    return jwt.sign({ user }, process.env.TOKEN, { expiresIn: '1h' });
};

module.exports = router;