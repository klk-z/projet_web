const { ObjectId } = require('mongodb');

class Messages {
    constructor(db) {
        this.db = db;
    }

    create(title, content, author, date, isAdmin) {
        return new Promise((resolve, reject) => {
            const newMessage = {
                title: title,
                content: content,
                author: author,
                date: new Date(date),
                isAdmin: isAdmin,
            };
            this.db.collection('messages').insertOne(newMessage)
                .then(result => {
                    resolve(result.insertedId);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.db.collection('messages').find()
                .toArray()
                .then(messages => {
                    // Tri des messages par date décroissante
                    messages.sort((a, b) => {
                        // Convertit les dates en objets Date et les compare
                        return new Date(b.date) - new Date(a.date);
                    });
                    resolve(messages);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getByUsername(us) {
        return new Promise((resolve, reject) => {
            this.db.collection('messages').find({author: us})
                .toArray()
                .then(messages => {
                    resolve(messages);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getAdmin() {
        return new Promise((resolve, reject) => {
            this.db.collection('messages').find({isAdmin:true})
                .toArray()
                .then(messages => {
                    // Tri des messages par date décroissante
                    messages.sort((a, b) => {
                        // Convertit les dates en objets Date et les compare
                        return new Date(b.date) - new Date(a.date);
                    });
                    resolve(messages);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    delete(message_id) {
        return new Promise((resolve, reject) => {
            this.db.collection('messages').deleteOne({ _id: new ObjectId(message_id) })
                .then(result => {
                    if (result.deletedCount === 1) {
                        resolve(result);
                    } else {
                        reject(new Error('Le message n\'a pas été trouvé ou n\'a pas pu être supprimé.'));
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    


}

module.exports = Messages;
