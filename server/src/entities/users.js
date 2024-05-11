const { ObjectId } = require('mongodb');

class Users {
    constructor(db) {
        this.db = db;
        // Suite plus tard avec la BD
    }

    create(username, password, firstname,  lastname, isBanned, isAdmin, newUser) {
        return new Promise((resolve, reject) => {
            // Création d'une nouvelle instance de l'utilisateur
            if (false) {
                reject();
              } else {
            const user = {
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
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

    async update(userId, newData) {
        try {
            const result = await this.db.collection('users').updateOne(
                { _id: new ObjectId(userId) },
                { $set: newData }
            );
            if (result.modifiedCount === 0) {
                throw new Error("Aucun utilisateur n'a été mis à jour");
            }
            return result;
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
        }
    }

    getByUsername(us) {
        return new Promise((resolve, reject) => {
            this.db.collection('users').findOne({ username: us })
            .then((res) => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
    }

    getById(userid) {
        return new Promise((resolve, reject) => {
            this.db.collection('users').findOne({ _id: new ObjectId(userid) })
            .then(user => {
                resolve(user);
            })
            .catch(error => {
                reject(error);
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
}

module.exports = Users;
