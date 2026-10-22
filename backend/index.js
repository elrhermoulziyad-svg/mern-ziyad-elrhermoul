const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables du fichier .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares obligatoires pour le MERN stack
app.use(express.json());
app.use(cors());

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Route de test
app.get('/', (req, res) => {
    res.send('Hello World ! Le serveur et MongoDB fonctionnent !');
});

app.listen(port, () => {
    console.log('Server qui tourne sur le port : ' + port);
});