const { ObjectId } = require('mongodb');
const MessageModel = require('../models/Message'); // Importez le modèle Message défini avec Mongoose

class Messages {
    constructor(db) {
      this.db = db
      //this.collection = db.collection('users');
      // suite plus tard avec la BD
    }
    create(title, content, author, date, isAdmin) {
        return new Promise((resolve, reject) => {
            // Création d'une nouvelle instance de message avec Mongoose
            const newMessage = new MessageModel({
                title: title,
                content: content,
                author: author,
                date: date,
                isAdmin: isAdmin,
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
    getAll() {
        return new Promise((resolve, reject) => {
            // Utilisez le modèle MessageModel pour trouver tous les messages dans la base de données
            MessageModel.find()
                .sort({ date: -1 }) // Triez les messages par date, du plus récent au plus ancien
                .exec()
                .then(messages => {
                    resolve(messages); // Renvoie la liste des messages
                })
                .catch(err => {
                    reject(err); // En cas d'erreur lors de la recherche des messages
                });
        });
    }


}
exports.default = Messages;
