import mongoose from 'mongoose';

const rechercheSchema = new mongoose.Schema({
  depart: {
    type: String,
    required: [true, 'Le lieu de départ est requis'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'La destination est requise'],
    trim: true
  },
  dateDebut: {
    type: Date,
    required: [true, 'La date de départ est requise']
  },
  bagage: {
    type: Boolean,
    default: false
  },
  Remarque: {
    type: String,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'L\'utilisateur est requis']
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour mettre à jour updatedAt avant chaque sauvegarde
rechercheSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Recherche = mongoose.models.Recherche || mongoose.model('Recherche', rechercheSchema);

export default Recherche; 