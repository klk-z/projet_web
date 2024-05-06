const { ObjectId } = require('mongodb');
const UserModel = require('../models/User'); // Importez le modèle User défini avec Mongoose

class Users {
    constructor(db) {
        this.db = db;
        // Suite plus tard avec la BD
    }

    create(username, password, lastname, firstname) {
        return new Promise((resolve, reject) => {
            // Création d'une nouvelle instance de l'utilisateur
            if (false) {
                reject();
              } else {
            const newUser = {
                username: username,
                password: password,
                lastname: lastname,
                firstname: firstname,
                isBanned: false,
                isAdmin: false,
                newUser: true
            };

            // Insertion de l'utilisateur dans la base de données
            this.db.collection('users').insertOne(newUser)
                .then((result) => {
                    resolve(result.insertedId);
                })
                .catch((dbError) => {
                    reject(dbError);
                });
            }
        });
    }

    get(userid) {
        return new Promise((resolve, reject) => {
            this.db.collection('users').findOne({ _id: ObjectId(userid) }, (err, user) => {
                if (err) {
                    reject(err); // En cas d'erreur lors de la recherche
                } else {
                    resolve(user); // Renvoie l'utilisateur trouvé ou null s'il n'existe pas
                }
            });
        });
    }

    async exists(username) {
        return new Promise((resolve, reject) => {
            this.db.collection('users').findOne({ username: username }, (err, user) => {
                if (err) {
                    reject(err); // En cas d'erreur lors de la recherche
                } else {
                    resolve(user ? true : false); // Renvoie true si l'utilisateur existe, sinon false
                }
            });
        });
    }

    checkPassword(username, password) {
        return new Promise((resolve, reject) => {
            this.db.collection('users').findOne({ username: username, password: password }, (err, user) => {
                if (err) {
                    reject(err); // En cas d'erreur lors de la recherche de l'utilisateur
                } else {
                    resolve(user ? user._id : null); // Renvoie l'identifiant de l'utilisateur si les informations de connexion sont correctes, sinon null
                }
            });
        });
    }
}

module.exports = Users;
