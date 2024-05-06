const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");
const session = require('express-session');
const { ObjectID } = require('mongodb');

function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });

    const users = new Users(db);
    const messages = new Messages(db);

    // Créer un utilisateur
    router.post("/user", async (req, res) => {
        const { username, password, lastname, firstname } = req.body;
        if (!username || !password || !lastname || !firstname) {
            res.status(400).send("Champs manquants");
        } else {
            users
            .create(username,password,firstname,lastname)
            .then((user_id) =>
            res
                .status(201)
                .send({ id: user_id, username: login, is_admin: is_admin }),
            )
            .catch((err) => res.status(500).send(err));
        }
    });

    // Créer un message
    router.post("/message", async (req, res) => {
        const { title, content, author, date, isAdmin } = req.body;
        if (!title || !content || !author || !date || !isAdmin) {
            res.status(400).send("Champs manquants");
        } else {
            try {
                const message_id = await messages.create(title, content, author, date, isAdmin);
                res.status(201).send({ id: message_id });
            } catch (error) {
                res.status(500).send(error.toString());
            }
        }
    });

    // Authentification utilisateur
    router.post("/user/login", async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json('Paramètre manquant');
            }

            const user = await users.getByUsername(username);
            if (!user) {
                return res.status(401).json('Utilisateur inconnu');
            }

            const passwordValid = await users.checkPassword(username, password);
            if (!passwordValid) {
                return res.status(401).json('Mot de passe incorrect');
            }

            req.session.regenerate((err) => {
                if (err) {
                    return res.status(504).json('Erreur de base de données');
                }

                req.session.username = username;
                req.session.cookie.maxAge = SESSION_DURATION;
                return res.status(200).json('Accès autorisé');
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Erreur interne",
                details: error.toString()
            });
        }
    });

    // Obtenir un utilisateur par ID
    router.get("/user/:user_id", async (req, res) => {
        try {
            const user_id = ObjectID(req.params.user_id);
            const user = await users.getById(user_id);
            if (!user) {
                res.sendStatus(404);
            } else {
                res.send(user);
            }
        } catch (error) {
            res.status(500).send(error.toString());
        }
    });

    // Supprimer un utilisateur par ID
    router.delete("/user/:user_id", async (req, res) => {
        try {
            const user_id = ObjectID(req.params.user_id);
            const result = await users.delete(user_id);
            res.send(result);
        } catch (error) {
            res.status(500).send(error.toString());
        }
    });

    return router;
}

exports.default = init;
