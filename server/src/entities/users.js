const { ObjectId } = require('mongodb');

class Users {
    constructor(db) {
        this.db = db;
        // Suite plus tard avec la BD
    }

    create(username, password, lastname, firstname, isBanned, isAdmin, newUser) {
        return new Promise((resolve, reject) => {
            // Création d'une nouvelle instance de l'utilisateur
            if (false) {
                reject();
              } else {
            const user = {
                username: username,
                password: password,
                lastname: lastname,
                firstname: firstname,
                isBanned: isBanned,
                isAdmin: isAdmin,
                newUser: newUser
            };

            // Insertion de l'utilisateur dans la base de données
            this.db.collection('users').insertOne(user)
                .then((result) => {
                    resolve(result.insertedId);
                })
                .catch((dbError) => {
                    reject(dbError);
                });
            }
        });
    }
    
    getAll() {
        return new Promise((resolve, reject) => {
            this.db.collection('users').find()
                .toArray()
                .then(allUsers => {
                    resolve(allUsers);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getNewUsers() {
        return new Promise((resolve, reject) => {
            this.db.collection('users').find({ newUser: true })
                .toArray()
                .then(allUsers => {
                    resolve(allUsers);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    get(filters = {}) {
        return new Promise((resolve, reject) => {
            this.db.collection('users').find(filters)
                .toArray()
                .then(users => {
                    resolve(users);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    update(userId, newData) {
        return new Promise((resolve, reject) => {
            this.db.collection('users').updateOne({ _id: userId }, newData)
                .then(() => {
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getById(userid) {
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
