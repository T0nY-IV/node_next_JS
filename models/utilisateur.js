const mongoose = require('mongoose');
const utilisateurSchema = new mongoose.Schema({
    nom : { type : String, required : true},
    prenom : { type : String, required : true},
    email : { type : String, required : true, unique : true},
    motdepasse : { type : String, required : true},
    role : { type : String, required : true, enum : ['admin', 'user']},
})
module.exports = mongoose.model('utilisateur', utilisateurSchema);