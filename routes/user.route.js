const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
router.post('/', async (req, res) => {
    const { Cin, Nom, Prenom, Email, Password, Image } = req.body; 
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        let imageUrl = null; // Use 'let' instead of 'const'
        if (Image) {
            const result = await cloudinary.uploader.upload(Image); // Await the upload result
            imageUrl = result.secure_url; // Reassign the secure URL
        }

        const newUser = new User({
            Cin: Cin,
            Nom: Nom,
            Prenom: Prenom,
            Email: Email,
            Password: hashedPassword,
            Role: 'user',
            Image: imageUrl // Save the uploaded image URL
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const generationToken = (user) => {
    return jwt.sign({ user }, process.env.TOKEN, { expiresIn: '1h' });
};

router.post('/login', async (req, res) => {
    const { Cin, Password } = req.body;
    try {
        if (!Cin || !Password) {
            res.status(400).json({ message: "Please fill all fields" });
        }
        let User = await user.findOne({ Cin });
        if (!User) {
            return res.status(400).json({ message: "User not found" });
        } else if (await bcrypt.compare(Password, user.Password)) {
            const token = generationToken(User);
            res.status(200).json({ success: true, token, User });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/update/:Cin', async (req, res) => {
    const { Cin } = req.params;
    let { Nom, Prenom, Email, Password, Image } = req.body; // Use 'let' for Password and Image
    try {
        const user = await User.findOne({ Cin });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (Password) {
            const salt = await bcrypt.genSalt(10);
            Password = await bcrypt.hash(Password, salt); // Reassign hashed password
        }
        if (Image) {
            const result = await cloudinary.uploader.upload(Image);
            Image = result.secure_url; // Reassign the secure URL
        }
        user.Nom = Nom || user.Nom;
        user.Prenom = Prenom || user.Prenom;
        user.Email = Email || user.Email;
        user.Password = Password || user.Password;
        user.Image = Image || user.Image;
        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const users = await User.find({}, null, { sort: { "_id": -1 } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;