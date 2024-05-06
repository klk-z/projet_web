const path = require('path');
const api = require('./api.js');
const db = require('./db/db.js');


// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const express = require('express');
const app = express();
const session = require("express-session");

app.use(session({
    secret: "technoweb rocks",
    resave: true,
    saveUninitialized: false
}));

const cors = require('cors')
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});


db.default().then(base => {
    app.use('/api', api.default(base))
})

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

