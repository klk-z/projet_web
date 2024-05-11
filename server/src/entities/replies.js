const { ObjectId } = require('mongodb');

class Replies {
    constructor(db) {
        this.db = db;
    }

    getByParentId(messageId) {
        return new Promise((resolve, reject) => {
            this.db.collection('replies').find({ isReplyTo: messageId })
                .toArray()
                .then(replies => {
                    resolve(replies);
                    console.log(replies);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    create(replyData) {
        return new Promise((resolve, reject) => {
            this.db.collection('replies').insertOne(replyData)
                .then(result => {
                    if (result.insertedId) {
                        resolve(result.insertedId);
                    } else {
                        reject(new Error('Erreur lors de l\'ajout de la réponse'));
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

}

module.exports = Replies;