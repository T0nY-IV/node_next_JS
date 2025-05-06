const mongoose = require('mongoose');
const RechecheSchema = new mongoose.Schema({
    lieuDepart : { type : String, required : true},
    lieuArrivee : { type : String, required : true},
    dateDepart : { type : Date, required : true},
    description : { type : String, required : true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    createdAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model('recherche', RechecheSchema);