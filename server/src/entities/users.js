const { ObjectId } = require('mongodb');

class Users {
  constructor(db) {
    this.db = db
    //this.collection = db.collection('users');

    // suite plus tard avec la BD
  }

  create(login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
      // Création de l'objet utilisateur à insérer dans la base de données
      const newUser = {
        login: login,
        password: password,
        lastname: lastname,
        firstname: firstname
      };

      // Insertion de l'utilisateur dans la base de données
      this.collection.insertOne(newUser, (err, result) => {
        if (err) {
          reject(err); // En cas d'erreur lors de l'insertion
        } else {
          // Récupération de l'identifiant de l'utilisateur nouvellement inséré
          const userId = result.insertedId;
          resolve(userId); // Renvoie l'identifiant de l'utilisateur inséré
        }
      });
    });
  }

  get(userid) {
    return new Promise((resolve, reject) => {
      const user = {
         login: "pikachu",
         password: "1234",
         lastname: "chu",
         firstname: "pika"
      }; // À remplacer par une requête bd

      if(false) {
        //erreur
        reject();
      } else {
        if(userid == 1) {
          resolve(user);
        } else {
          resolve(null);
        }
      }
    });
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
      if(false) {
        //erreur
        reject();
      } else {
        resolve(true);
      }
    });
  }

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      let userid = 1; // À remplacer par une requête bd
      if(false) {
        //erreur
        reject();
      } else {
        resolve(userid);
      }
    });
  }

}

exports.default = Users;

