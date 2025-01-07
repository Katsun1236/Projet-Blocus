const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pseudo: { type: String },
    profilePic: { type: String },
    scores: { type: Map, of: Number },
    times: { type: Map, of: Number },
    role: { type: String, enum: ['visiteur', 'administrateur'], default: 'visiteur' }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
