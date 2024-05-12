const { ObjectId } = require("mongodb");

class Replies {
  constructor(db) {
    this.db = db;
  }

  getByParentId(messageId) {
    return new Promise((resolve, reject) => {
      this.db
        .collection("replies")
        .find({ isReplyTo: messageId })
        .toArray()
        .then((replies) => {
          resolve(replies);
          console.log(replies);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  create(replyData) {
    return new Promise((resolve, reject) => {
      this.db
        .collection("replies")
        .insertOne(replyData)
        .then((result) => {
          if (result.insertedId) {
            resolve(result.insertedId);
          } else {
            reject(new Error("Erreur lors de l'ajout de la réponse"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  delete(reply_id) {
    return new Promise((resolve, reject) => {
      this.db
        .collection("replies")
        .deleteOne({ _id: new ObjectId(reply_id) })
        .then((result) => {
          if (result.deletedCount === 1) {
            resolve(result);
          } else {
            reject(
              new Error(
                "Le message n'a pas été trouvé ou n'a pas pu être supprimé."
              )
            );
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Replies;
