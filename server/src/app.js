const path = require('path');
const api = require('./api.js');
const mongoose = require("mongoose")
const cors = require('cors');
const mongo_url = "mongodb://localhost:27017/projet_web/"



// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const express = require('express');
const app = express();
api_1 = require("./api.js");
const session = require("express-session");

app.use(session({
    secret: "technoweb rocks",
    resave: true,
    saveUninitialized: false
}));

app.use('/api', api.default());

app.use(cors());
app.use(express.json())
mongoose.connect(mongo_url)
const db = mongoose.connection;
db.on('error', (err) =>{
    console.error('Mongodb connection error: ', err)
})

db.once('open', ()=>{
    console.log('MongoDB is connected')
})

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

