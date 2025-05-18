const express = require('express');
const router = express.Router();
const Announce = require('../models/Announce');
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/all', async (req, res) => {
    try {
        const announces = await Announce.find({}, null, { sort: { "_id": -1 } });
        res.status(200).json(announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/offre', async (req, res) => {
    try {
        const announces = await Announce.find({ type_poste: 'offre' }, null, { sort: { "_id": -1 } });
        res.status(200).json(announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/Recherche', async (req, res) => {
    try{
        const announces = await Announce.find({ type_poste: 'recherche' }, null, { sort: { "_id": -1 } });
        res.status(200).json(announces);
    }catch(error){
        res.status(500).json({ error: error.message});
    }
});

router.post('/ajoutOffre', async (req, res) => {
    const { ModelVoiture, nbPlaceVal, prix, depart, destination, bagage, dateDebut, Remarque, userId } = req.body;
    try {
        const newAnnounce = new Announce({
            type_poste: 'offre',
            ModelVoiture,
            nbPlaceVal,
            prix,
            depart,
            destination,
            bagage,
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
router.post('/ajoutRecherche', async (req, res) => {
    const { depart, destination, bagage, dateDebut, Remarque, userId } = req.body;
    try {
        const newAnnounce = new Announce({
            type_poste: 'recherche',
            depart,
            destination,
            bagage,
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

router.get('/search', async (req, res) => {
    const { dateDebut, depart, destination, bagage } = req.query;
    try {
        const query = {};
        if (dateDebut) query.dateDebut = dateDebut;
        if (depart) query.depart = depart;
        if (destination) query.destination = destination;
        if (bagage !== undefined) query.bagage = bagage === 'true' ? true : bagage === 'false' ? false : bagage;

        const Announces = await Announce.find(query);
        res.status(200).json(Announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/searchOffre', async (req, res) => {
    const { dateDebut, depart, destination, bagage } = req.query;
    try {
        const query = {};
        if (dateDebut) query.dateDebut = dateDebut;
        if (depart) query.depart = depart;
        if (destination) query.destination = destination;
        if (bagage !== undefined) query.bagage = bagage === 'true' ? true : bagage === 'false' ? false : bagage;
        query.type_poste = 'offre';

        const Announces = await Announce.find(query);
        res.status(200).json(Announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/searchRecherche', async (req, res) => {
    const { dateDebut, depart, destination, bagage } = req.query;
    try {
        const query = {};
        if (dateDebut) query.dateDebut = dateDebut;
        if (depart) query.depart = depart;
        if (destination) query.destination = destination;
        if (bagage !== undefined) query.bagage = bagage === 'true' ? true : bagage === 'false' ? false : bagage;
        query.type_poste = 'recherche';

        const Announces = await Announce.find(query);
        res.status(200).json(Announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const announce = await Announce.findByIdAndDelete(id);
        if (!announce) {
            return res.status(404).json({ message: 'Announce not found' });
        }
        res.status(200).json({ message: 'Announce deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/updateRecherche/:id', async (req, res) => {
    const { id } = req.params;
    const { depart, destination, bagage, dateDebut, Remarque} = req.body;
    try {
        const announce = await Announce.findByIdAndUpdate(id, {
            depart,
            destination,
            bagage,
            dateDebut,
            Remarque
        }, { new: true });
        if (!announce) {
            return res.status(404).json({ message: 'Announce not found' });
        }
        res.status(200).json(announce);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/updateOffre/:id', async (req, res) => {
    const { id } = req.params;
    const { ModelVoiture, nbPlaceVal, prix, depart, destination, bagage, dateDebut, Remarque } = req.body;
    try {
        const announce = await Announce.findByIdAndUpdate(id, {
            ModelVoiture,
            nbPlaceVal,
            prix,
            depart,
            destination,
            bagage,
            dateDebut,
            Remarque
        }, { new: true });
        if (!announce) {
            return res.status(404).json({ message: 'Announce not found' });
        }
        res.status(200).json(announce);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const announce = await Announce.findById(id);
        if (!announce) {
            return res.status(404).json({ message: 'Announce not found' });
        }
        res.status(200).json(announce);
    }catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;