const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { Cin, Nom, Prenom, Email, Password, Role } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        const newUser = new User({
            Cin: Cin,
            Nom: Nom,
            Prenom: Prenom,
            Email: Email,
            Password: hashedPassword,
            Role: Role
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const generationToken = (user) => {
    return jwt.sign({ user }, process.env.TOKEN, { expiresIn: '1h' })
}

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
})

module.exports = router;