const path = require('path');
const api = require('./api.js');
const express = require('express');
const cors = require('cors');
express = require('express');
const session = require("express-session");

const app = express();
app.use(cors());

// Autres configurations de votre application Express...

// Montez les routes de l'API
app.use('/api', api.default());

// Démarrez le serveur
const port = 4000; // Choisissez le port que vous souhaitez utiliser
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

module.exports = app;


// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);


app.use(session({
    secret: "technoweb rocks",
    resave: true,
    saveUninitialized: false
}));

app.use('/api', api.default());

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

