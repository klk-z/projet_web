const { ObjectId } = require('mongodb');
const MessageModel = require('../models/Message'); // Importez le modèle Message défini avec Mongoose

class Messages {
    constructor(db) {
      this.db = db
      //this.collection = db.collection('users');
      // suite plus tard avec la BD
    }
    create(title, content, user) {
        return new Promise((resolve, reject) => {
            // Création d'une nouvelle instance de message avec Mongoose
            const newMessage = new MessageModel({
                title: title,
                content: content,
                author: user.username,
                date: new Date(),
                isAdmin: user.isAdmin,
            });

            // Sauvegarde du message dans la base de données
            newMessage.save()
                .then(message => {
                    resolve(message._id); // Renvoie l'identifiant du message sauvegardé
                })
                .catch(err => {
                    reject(err); // En cas d'erreur lors de la sauvegarde
                });
        });
    }
}