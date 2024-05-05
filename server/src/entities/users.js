const { ObjectId } = require('mongodb');
const UserModel = require('../models/User'); // Importez le modèle User défini avec Mongoose

class Users {
  constructor(db) {
    this.db = db
    //this.collection = db.collection('users');

    // suite plus tard avec la BD
  }

  create(login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
        // Création d'une nouvelle instance de l'utilisateur avec Mongoose
        const newUser = new UserModel({
            login: login,
            password: password,
            lastname: lastname,
            firstname: firstname,
            isAccepted: false,
            isAdmin: false,
            //profilePicture : pfp
        });

        // Sauvegarde de l'utilisateur dans la base de données
        newUser.save()
            .then(user => {
                resolve(user._id); // Renvoie l'identifiant de l'utilisateur sauvegardé
            })
            .catch(err => {
                reject(err); // En cas d'erreur lors de la sauvegarde
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

