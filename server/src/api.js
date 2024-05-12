const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");
const Replies = require("./entities/replies.js");

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

        // Affichage des informations sur la réponse
        res.on('finish', () => {
            console.log('Response Status:', res.statusCode);
            console.log('Response Body:', res.locals.data); // Vous pouvez accéder aux données de la réponse via res.locals.data
        });
        next();

    });

    const users = new Users(db);
    const messages = new Messages(db);
    const replies = new Replies(db);

    // Créer un utilisateur
    router.post("/user", async (req, res) => {
        const { username, password,  firstname, lastname, isBanned, isAdmin, newUser } = req.body;
        if (!username || !password || !lastname || !firstname) {
            res.status(400).send("Champs manquants");
        } else {
            users
            .create(username,password,firstname,lastname, isBanned, isAdmin, newUser)
            .then((user_id) =>
            res
                .status(201)
                .send({ id: user_id, username: username, firstname: firstname, lastname: lastname, isBanned: isBanned, isAdmin: isAdmin, newUser:newUser }),
            )
            .catch((err) => res.status(500).send(err));
        }
    });

    // Get new users
    router.get("/users/new", (req, res) => {
        users.getNewUsers()
            .then(allUsers => {
                res.send(allUsers);
            })
            .catch(error => {
                res.status(500).send(error.toString());
            });
    });

    // Get all users
    router.get("/users/all", (req, res) => {
        users.getAll()
            .then(allUsers => {
                res.send(allUsers);
            })
            .catch(error => {
                res.status(500).send(error.toString());
            });
    });

    // Obtenir un utilisateur par nom d'utilisateur
    router.get("/user/:username", async (req, res) => {
        try {
            const username = req.params.username;
            console.log(username);
            const user = await users.getByUsername(username);
            if (!user) {
                res.sendStatus(404);
                console.log(user);
            } else {
                res.send(user);
            }
        } catch (error) {
            res.status(500).send(error.toString());
        }
    });



    // Get filtered users
    /*
    router.get("/users", (req, res) => {
        const filters = req.query
        users.get(filters)
            .then(allUsers => {
                res.send(allUsers);
            })
            .catch(error => {
                res.status(500).send(error.toString());
            });
    });*/

    // Créer un message
    router.post("/message", (req, res) => {
        const { title, content, author, date, isAdmin } = req.body;
        if (!title || !content || !author || !date ) {
            res.status(400).send("Champs manquants");
        } else {
            messages.create(title, content, author, date, isAdmin)
                .then(message_id => {
                    res.status(201).send({ id: message_id });
                })
                .catch(error => {
                    res.status(500).send(error.toString());
                });
        }
    });

    // Obtenir tous les messages
    router.get("/messages", (req, res) => {
        messages.getAll()
            .then(messages => {
                res.send(messages);
            })
            .catch(error => {
                res.status(500).send(error.toString());
            });
    });

    router.get("/user/:username/messages", async (req, res) => {
        try {
            const username = req.params.username;
            const mes = await messages.getByUsername(username);
            if (!mes) {
                res.sendStatus(404);
                console.log(mes);
            } else {
                res.send(mes);
            }
        } catch (error) {
            res.status(500).send(error.toString());
        }
    });

    // Obtenir tous les messages
    router.get("/messages/admins", (req, res) => {
        messages.getAdmin()
            .then(messages => {
                res.send(messages);
            })
            .catch(error => {
                res.status(500).send(error.toString());
            });
    });

    // Récupérer toutes les réponses d'un message
    router.get("/message/:id/replies", async (req, res) => {
        try {
            const messageId = req.params.id;
            const rep = await replies.getByParentId(messageId);
            if (!rep) {
                res.sendStatus(404);
                console.log(rep);
            } else {
                res.send(rep);
            }
        } catch (error) {
            res.status(500).send(error.toString());
        }
    });

    // Ajouter une réponse à un message
    router.post("/message/reply", async (req, res) => {
        try {
            const { content, author, date: dateString, isReplyTo } = req.body;
            const date = new Date(dateString); // Convertir la date en objet Date
            const replyData = { content, author, date, isReplyTo };
            const replyId = await replies.create(replyData);
            res.status(201).send({ id: replyId });
        } catch (error) {
            res.status(500).send(error.toString());
        }
    });

    // Ajouter une réponse imbriquée à une réponse
    router.post("/reply/reply", async (req, res) => {
        try {
            const { content, author, date: dateString, isReplyTo } = req.body;
            const date = new Date(dateString); // Convertir la date en objet Date
            const nestedReplyData = {content, author, date, isReplyTo} ;
            const nestedReplyId = await replies.create(nestedReplyData);
            res.status(201).send({ id: nestedReplyId });
        } catch (error) {
            res.status(500).send(error.toString());
        }
    });

    // Get les réponses imbriquées à une réponse
    router.get("/reply/:replyId/replies", async (req, res) => {
        try {
            const parentReplyId = req.params.replyId;
            const nestedReplyId = await replies.getByParentId(parentReplyId);
            if (!nestedReplyId) {
                res.sendStatus(404);
                console.log(nestedReplyId);
            } else {
                res.send(nestedReplyId);
            }
        } catch (error) {
            res.status(500).send(error.toString());
        }
    });

    // Mettre à jour un utilisateur par ID
    router.put("/user/:user_id/approve", async (req, res) => {
        const userId = req.params.user_id;
        console.log(userId)
        // Assurez-vous que l'utilisateur existe
        const userExists = await users.getById(userId);
        if (!userExists) {
            console.log('util pas exite')

            res.status(404).send("Utilisateur non trouvé");
        } else{
            console.log("user existe ",userExists);
            // Mettre à jour les informations de l'utilisateur
            try {
                await users.update(userId, { newUser:false, isBanned:false });
                res.status(200).send("Utilisateur mis à jour avec succès (approved)");
            } catch (error) {
                res.status(500).send("Erreur lors de la mise à jour de l'utilisateur");
            }
        }
    });

    // Mettre à jour un utilisateur par ID
    router.put("/user/:user_id/reject", async (req, res) => {
        const userId = req.params.user_id;
        console.log(userId)
        // Assurez-vous que l'utilisateur existe
        const userExists = await users.getById(userId);
        if (!userExists) {
            res.status(404).send("Utilisateur non trouvé");
        } else{
            console.log("user existe ",userExists);
            // Mettre à jour les informations de l'utilisateur
            try {
                await users.update(userId, { newUser:false, isBanned:true });
                res.status(200).send("Utilisateur mis à jour avec succès (banni)");
            } catch (error) {
                res.status(500).send("Erreur lors de la mise à jour de l'utilisateur");
            }
        }
    });



    // Authentification utilisateur
    /*
    router.post("/user/login", async (req, res) => {
        try {
            const { username, password } = req.body;
    
            if (!username || !password) {
                return res.status(400).json({ error: 'Paramètre manquant' });
            }
    
            const user = await users.getByUsername(username);
            if (!user) {
                return res.status(401).json({ error: 'Nom d\'utilisateur incorrect' });
            }
    
            const passwordValid = await users.checkPassword(username, password);
            if (!passwordValid) {
                return res.status(401).json({ error: 'Mot de passe incorrect' });
            }
    
            req.session.regenerate((err) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur lors de la génération de la session' });
                }
    
                req.session.username = username;
                req.session.cookie.maxAge = SESSION_DURATION;
                return res.status(200).json({ success: 'Accès autorisé' });
            });
        } catch (error) {
            console.error('Erreur lors de la connexion utilisateur :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    });*/

    router.post("/user/login", async (req, res) => {
        try {
          let login = null;
          let password = null;
          if (req.session.userid) {
            login = req.session.userid.login;
            password = req.session.userid.password;
          } else {
            login = req.body.login;
            password = req.body.password;
          }
          if (!login || !password) {
            res.status(400).json({
              status: 400,
              message: "Requête invalide : login et password nécessaires",
            });
            return;
          }
          if (!(await users.exists(login))) {
            res.status(401).json({
              status: 401,
              message: "Utilisateur inconnu",
            });
            return;
          }
          let userid = await users.checkPassword(login, password);
          if (userid) {
            // Avec middleware express-session
            req.session.regenerate(function (err) {
              if (err) {
                res.status(500).json({
                  status: 500,
                  message: "Erreur interne",
                });
              } else {
                // C'est bon, nouvelle session créée
                req.session.userid = userid;
                res.status(200).json({
                  status: 200,
                  message: "Login et mot de passe accepté",
                  id: new ObjectID(userid._id),
                  username: userid.username,
                  firstname: userid.firstname,
                  lastname: userid.lastname,
                  isAdmin: userid.isAdmin,
                  isBanned: userid.isBanned,
                  newUser: userid.newUser,
                });
              }
            });
            return;
          }
          // Faux login : destruction de la session et erreur
          req.session.destroy((err) => {});
          res.status(403).json({
            status: 403,
            message: "login et/ou le mot de passe invalide(s)",
          });
          return;
        } catch (e) {
          // Toute autre erreur
          res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString(),
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

    // Supprimer un utilisateur par ID
    router.delete("/message/:message_id", async (req, res) => {
        try {
            const message_id = req.params.message_id;
            const result = await messages.delete(message_id);
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send(error.toString());
        }
    });

    // Supprimer un utilisateur par ID
    router.delete("/reply/:reply_id", async (req, res) => {
        try {
            const reply_id = req.params.reply_id;
            const result = await replies.delete(reply_id);
            res.status(201).send(result);
        } catch (error) {
            res.status(500).send(error.toString());
        }
    });

    return router;
}

exports.default = init;
