const { ObjectId } = require('mongodb');
const UserModel = require('../models/Message'); // Importez le modèle User défini avec Mongoose

class Users {
  constructor(db) {
    this.db = db
    //this.collection = db.collection('users');
    // suite plus tard avec la BD
  }

  create(username, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
        // Création d'une nouvelle instance de l'utilisateur avec Mongoose
        const newUser = new UserModel({
            username: username,
            password: password,
            lastname: lastname,
            firstname: firstname,
            isBanned: false,
            isAdmin: false,
            newUser: true
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
/*
  get(userid) {
    return new Promise((resolve, reject) => {
      const user = {
         username: "pikachu",
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
  }*/
  get(userid) {
    return new Promise((resolve, reject) => {
        UserModel.findById(userid, (err, user) => {
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
      if(false) {
        //erreur
        reject();
      } else {
        resolve(true);
      }
    });
  }

  checkpassword(username, password) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ username: username, password: password }, (err, user) => {
            if (err) {
                reject(err); // En cas d'erreur lors de la recherche de l'utilisateur
                console.log("err user: ", err)
            } else {
                if (user) {
                    resolve(user._id); // Renvoie l'identifiant de l'utilisateur si les informations de connexion sont correctes
                    console.log("Correct Password")
                  } else {
                    resolve(null); // Renvoie null si les informations de connexion sont incorrectes
                    console.log("informations erronées")
                  }
            }
        });
    });
  }
  /*
  checkpassword(username, password) {
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
  */

}

exports.default = Users;

