const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    Cin : { type: String, required: true, primary: true },
    Nom : { type: String, required: true },
    Prenom : { type: String, required: true },
    Email : { type: String, required: true },
    Password : { type: String, required: true },
    Role : { type: String, required: true, enum: ['admin', 'user'] },
    gender: { type: String, required: true, enum: ['homme', 'femme'] },
    Image : { type: String, required: false },
});
module.exports = mongoose.model("User", userSchema);
