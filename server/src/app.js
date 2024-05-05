const path = require('path');
const api = require('./api.js');
const mongoose = require("mongoose")
const mongo_url = "mongodb://127.0.0.1:27017/projet_web"



// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const express = require('express');
const app = express();
api_1 = require("./api.js");
const session = require("express-session");

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

app.use(session({
    secret: "technoweb rocks",
    resave: true,
    saveUninitialized: false
}));

app.use(express.json())
mongoose.connect(mongo_url)
const db = mongoose.connection;
db.on('error', (err) =>{
    console.error('Mongodb connection error: ', err)
})

db.once('open', ()=>{
    console.log('MongoDB is connected')
})

app.use('/api', api.default(mongoose));


// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

