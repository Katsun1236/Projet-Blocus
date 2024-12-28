const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;
const DB_URI = 'mongodb://127.0.0.1:27017/projet-blocus';
const JWT_SECRET = 'votre_secret_JWT_ici';

mongoose.set('strictQuery', true);
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to MongoDB at ${DB_URI}`))
    .catch(err => console.error(`Failed to connect to MongoDB: ${err.message}`));

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques depuis le dossier approprié
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'pages')));

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

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Cette adresse e-mail est déjà utilisée. Veuillez vous connecter.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            role: email === 'bastienfestor4@gmail.com' ? 'administrateur' : 'visiteur',
            scores: {},
            times: {}
        });

        await newUser.save();
        res.status(201).json({ message: 'Inscription réussie' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Identifiants incorrects' });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Token non fourni' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token invalide' });
    }
};

app.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des données utilisateur' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});