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
                date: date,
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
                .sort({ date: -1 }) // Triez les messages par date, du plus récent au plus ancien
                .toArray()
                .then(messages => {
                    resolve(messages);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

module.exports = Messages;
