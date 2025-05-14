const mongoose = require("mongoose");
const AnnounceSchema = new mongoose.Schema({
    ModelVoiture: { type: String, required: true },
    nbPlaceVal: { type: Number, required: true },
    bagage: { type: Boolean, required: true },
    prix: { type: Number, required: true },
    dateDebut: { type: Date, required: true },
    Remarque: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
module.exports = mongoose.model("Announce", AnnounceSchema);