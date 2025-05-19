const express = require('express');
const router = express.Router();
const Announce = require('../models/Announce');
const User = require('../models/user');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findOne({ Cin: req.user.Cin });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const announces = await Announce.find({ userId: user._id })
            .populate('userId', 'Nom Prenom Image')
            .sort({ "_id": -1 });
        res.status(200).json(announces);
    } catch (error) {
        console.error('Error fetching user announces:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const announces = await Announce.find()
            .populate('userId', 'Nom Prenom Image')
            .sort({ "_id": -1 });
        res.status(200).json(announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/offre', async (req, res) => {
    try {
        const announces = await Announce.find({ type_poste: 'offre' })
            .populate('userId', 'Nom Prenom Image')
            .sort({ "_id": -1 });
        res.status(200).json(announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/Recherche', async (req, res) => {
    try {
        const announces = await Announce.find({ type_poste: 'recherche' })
            .populate('userId', 'Nom Prenom Image')
            .sort({ "_id": -1 });
        res.status(200).json(announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/ajoutOffre', auth, async (req, res) => {
    const { ModelVoiture, nbPlaceVal, prix, depart, destination, bagage, dateDebut, Remarque } = req.body;
    try {
        const user = await User.findOne({ Cin: req.user.Cin });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

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
            userId: user._id
        });
        await newAnnounce.save();
        
        // Récupérer l'annonce avec les informations de l'utilisateur
        const populatedAnnounce = await Announce.findById(newAnnounce._id)
            .populate('userId', 'Nom Prenom Image');
            
        res.status(201).json(populatedAnnounce);
    } catch (error) {
        console.error('Error creating offer:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/ajoutRecherche', auth, async (req, res) => {
    const { depart, destination, bagage, dateDebut, Remarque } = req.body;
    try {
        const user = await User.findOne({ Cin: req.user.Cin });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newAnnounce = new Announce({
            type_poste: 'recherche',
            depart,
            destination,
            bagage,
            dateDebut,
            Remarque,
            userId: user._id
        });
        await newAnnounce.save();
        
        // Récupérer l'annonce avec les informations de l'utilisateur
        const populatedAnnounce = await Announce.findById(newAnnounce._id)
            .populate('userId', 'Nom Prenom Image');
            
        res.status(201).json(populatedAnnounce);
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

        const announces = await Announce.find(query)
            .populate('userId', 'Nom Prenom Image')
            .sort({ "_id": -1 });
        res.status(200).json(announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/searchOffre', async (req, res) => {
    const { dateDebut, depart, destination, bagage } = req.query;
    try {
        const query = { type_poste: 'offre' };
        if (dateDebut) query.dateDebut = dateDebut;
        if (depart) query.depart = depart;
        if (destination) query.destination = destination;
        if (bagage !== undefined) query.bagage = bagage === 'true' ? true : bagage === 'false' ? false : bagage;

        const announces = await Announce.find(query)
            .populate('userId', 'Nom Prenom Image')
            .sort({ "_id": -1 });
        res.status(200).json(announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/searchRecherche', async (req, res) => {
    const { dateDebut, depart, destination, bagage } = req.query;
    try {
        const query = { type_poste: 'recherche' };
        if (dateDebut) query.dateDebut = dateDebut;
        if (depart) query.depart = depart;
        if (destination) query.destination = destination;
        if (bagage !== undefined) query.bagage = bagage === 'true' ? true : bagage === 'false' ? false : bagage;

        const announces = await Announce.find(query)
            .populate('userId', 'Nom Prenom Image')
            .sort({ "_id": -1 });
        res.status(200).json(announces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ Cin: req.user.Cin });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const announce = await Announce.findOne({ _id: id, userId: user._id });
        if (!announce) {
            return res.status(404).json({ message: 'Announce not found or unauthorized' });
        }

        await Announce.findByIdAndDelete(id);
        res.status(200).json({ message: 'Announce deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/updateRecherche/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { depart, destination, bagage, dateDebut, Remarque } = req.body;
    try {
        const user = await User.findOne({ Cin: req.user.Cin });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const announce = await Announce.findOne({ _id: id, userId: user._id });
        if (!announce) {
            return res.status(404).json({ message: 'Announce not found or unauthorized' });
        }

        const updatedAnnounce = await Announce.findByIdAndUpdate(
            id,
            {
                depart,
                destination,
                bagage,
                dateDebut,
                Remarque
            },
            { new: true }
        ).populate('userId', 'Nom Prenom Image');

        res.status(200).json(updatedAnnounce);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/updateOffre/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { ModelVoiture, nbPlaceVal, prix, depart, destination, bagage, dateDebut, Remarque } = req.body;
    try {
        const user = await User.findOne({ Cin: req.user.Cin });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const announce = await Announce.findOne({ _id: id, userId: user._id });
        if (!announce) {
            return res.status(404).json({ message: 'Announce not found or unauthorized' });
        }

        const updatedAnnounce = await Announce.findByIdAndUpdate(
            id,
            {
                ModelVoiture,
                nbPlaceVal,
                prix,
                depart,
                destination,
                bagage,
                dateDebut,
                Remarque
            },
            { new: true }
        ).populate('userId', 'Nom Prenom Image');

        res.status(200).json(updatedAnnounce);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour réserver une place (décrémenter nbPlaceVal)
router.patch('/reserve/:id', auth, async (req, res) => {
    try {
        const announce = await Announce.findById(req.params.id);
        if (!announce) {
            return res.status(404).json({ message: 'Annonce non trouvée' });
        }
        if (announce.nbPlaceVal <= 0) {
            return res.status(400).json({ message: 'Plus de places disponibles' });
        }
        announce.nbPlaceVal -= 1;
        await announce.save();
        const updatedAnnounce = await Announce.findById(announce._id).populate('userId', 'Nom Prenom Image');
        res.status(200).json(updatedAnnounce);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la réservation', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const announce = await Announce.findById(id)
            .populate('userId', 'Nom Prenom Image');
        if (!announce) {
            return res.status(404).json({ message: 'Announce not found' });
        }
        res.status(200).json(announce);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer tous les départs distincts
router.get('/distinct/depart', async (req, res) => {
  try {
    const departs = await Announce.distinct('depart');
    res.status(200).json(departs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer toutes les arrivées distinctes
router.get('/distinct/destination', async (req, res) => {
  try {
    const destinations = await Announce.distinct('destination');
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;