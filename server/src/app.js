const path = require('path');
const apiRouter = require('./api.js');
const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "mySecretKey",
    resave: true,
    saveUninitialized: false
}));
app.use('/api', apiRouter.default());

exports.default = app;

