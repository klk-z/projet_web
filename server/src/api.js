const express = require("express");
const Users = require("./entities/users.js");
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
    });

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
    /*    
    router.post("/user", (req, res) => {
        const { username, password, lastname, firstname } = req.body;
        UserModel.findOne({username: username, password:password, lastname:lastname,
        firstname:firstname }).
        then(user => {
            if(user){
                res.json("Le nom d'utilisateur est déjà utilisé")
            }else{
                UserModel.create({
                    username: username,
                    password: password,
                    lastname: lastname,
                    firstname: firstname,
                    isAccepted: false,
                    isAdmin: false  
                })
                .then(result => res.json("Compte créé.")) // en attente de validation
                .catch(err => res.json(err))
            }
        }).catch(err => res.json(err))
    });*/

    return router;
}
exports.default = init;

