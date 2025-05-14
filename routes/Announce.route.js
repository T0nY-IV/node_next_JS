const express = require('express');
const router = express.Router();
const Announce = require('../models/Announce');
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/all', async (req, res) => {
    try {
        const announces = await Announce.find({}, null, {sort:{"_id": -1}});
        res.status(200).json(announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/add', async (req, res) => {
    const { ModelVoiture, nbPlaceVal, bagage, prix, dateDebut, Remarque, userId } = req.body;
    try {
        const newAnnounce = new Announce({
            ModelVoiture,
            nbPlaceVal,
            bagage,
            prix,
            dateDebut,
            Remarque,
            userId
        });
        await newAnnounce.save();
        res.status(201).json(newAnnounce);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;