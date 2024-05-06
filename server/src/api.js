const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");
const session = require('express-session');
//const UserModel = require('./models/User')

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

    const users = new Users.default(db);
    const messages = new Messages.default(db);

    // créer un utilisateur
    router.post("/user", (req, res) => {
        const { username, password, lastname, firstname } = req.body;
        if (!username || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            users.create(username, password, lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    // créer un message
    router.post("/message", (req, res) => {
        const { title, content, user } = req.body;
        if (!title || !content || !user) {
            res.status(400).send("Missing fields");
        } else {
            messages.create(title, content, user)
                .then((message_id) => res.status(201).send({ id: message_id }))
                .catch((err) => res.status(500).send(err));
        }
    });



    router.post("/user/username", async (req, res) => {
        try {
            const { username, password } = req.body;
            // Erreur sur la requête HTTP
            if (!username || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : username et password nécessaires"
                });
                return;
            }
            if (!await users.exists(username)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }

            let userid = await users.checkpassword(username, password);
            if (userid) {
                try {
                    // Récupérer l'utilisateur à partir de l'ID
                    const user = await users.get(userid);
                    if (!user) {
                        // L'utilisateur n'a pas été trouvé, renvoyer une erreur
                        res.status(404).json({
                            status: 404,
                            message: "Utilisateur introuvable"
                        });
                    } else {
                        // L'utilisateur a été trouvé, renvoyez une réponse réussie avec les informations de l'utilisateur
                        res.status(200).json({
                            status: 200,
                            message: "Connexion réussie",
                            user: user
                        });
                    }
                } catch (error) {
                    // Une erreur s'est produite lors de la récupération de l'utilisateur
                    console.error(error);
                    res.status(500).json({
                        status: 500,
                        message: "Erreur interne lors de la récupération de l'utilisateur"
                    });
                }
            } else {
                // Mauvais username ou mot de passe
                res.status(403).json({
                    status: 403,
                    message: "username et/ou le mot de passe invalide(s)"
                });
            }
        } catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });


    /*
    router.post("/user/username", async (req, res) => {
        try {
            const { username, password } = req.body;
            // Erreur sur la requête HTTP
            if (!username || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : username et password nécessaires"
                });
                return;
            }
            if(! await users.exists(username)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.checkpassword(username, password);
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "username et mot de passe accepté"
                        });
                    }
                });
                return;
            }
            // Faux username : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "username et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });*/

    router
        .route("/user/:user_id(\\d+)")
        .get(async (req, res) => {
        try {
            const user = await users.get(req.params.user_id);
            if (!user)
                res.sendStatus(404);
            else
                res.send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));


    
    router.post('/user/login', async (req, res) => {
        try {
            const { mail, password } = req.body;
    
            if (!mail || !password) {
                return res.status(400).json('Paramètre manquant');
            }
    
            await users.connect();
            const exists = await users.userExists(mail);
            if (!exists) {
                return res.status(401).json('Utilisateur inconnu');
            }
    
            /*
            const passwordValide = await bcrypt.compare(req.body.password, user.password);
            if (!passwordValide) {
                return res.status(401).json('Mot de passe incorrect');
            }
            */
            
            const passwordValide = await users.checkpassword(username, password);
            if (!passwordValide) {
                return res.status(401).json('Mot de passe incorrect');
            }
    
            req.session.regenerate((err) => {
                if (err) {
                    return res.status(504).json('Database error');
                }
    
                req.session.mail = mail;
                req.session.cookie.maxAge = SESSION_DURATION;
                return res.status(200).json('Access granted');
            });
    
        } catch (err) {
            console.error(err);
            return res.status(504).json('Database error');
        } finally {
            await users.disconnect();
        }
    });


    return router;
}
exports.default = init;

