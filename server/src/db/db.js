const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1";
const client = new MongoClient(url);

async function main() {
  try {
    let connection = await client.connect();
    return connection.db("projet_web");
  } catch (e) {
    console.error(e);
  }
}

exports.default = main;
