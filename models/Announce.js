const mongoose = require("mongoose");
const AnnounceSchema = new mongoose.Schema({
    type_poste: { type: String, enum: ['offre', 'recherche'], required: true },
    ModelVoiture: { type: String, required: function() { return this.type_poste === 'offre'; } },
    nbPlaceVal: { type: Number, required: function() { return this.type_poste === 'offre'; } },
    prix: { type: Number, required: function() { return this.type_poste === 'offre'; } },
    depart: { type: String, required: true },
    destination: { type: String, required: true },
    bagage: { type: Boolean, required: true},
    dateDebut: { type: Date, required: true },
    dateCreation: { type: Date, default: Date.now },
    Remarque: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
module.exports = mongoose.model("Announce", AnnounceSchema);