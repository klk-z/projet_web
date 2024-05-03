const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

class Users {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.client = new MongoClient(url, { useNewUrlParser: true });
  }

  async connect() {
    await this.client.connect();
    console.log(`Connected to MongoDB at ${this.url}`);
    this.db = this.client.db(this.dbName);
    this.users = this.db.collection('users');
  }

  async disconnect() {
      await this.client.close();
  }

  create(login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
      let userid = 1; // À remplacer par une requête bd
      //let userid = await this.db.query("INSERT INTO users (login, password, lastname, firstname) VALUES (?, ?, ?, ?)", [login, password, lastname, firstname]);
      if(false) {
        //erreur
        reject();
      } else {
        resolve(userid);
      }
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

