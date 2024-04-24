const {MongoClient} = require('mongodb');



const url = "mongodb://localhost";
const client = new MongoClient(url);
try {
    // Connexion
    await client.connect();

    // On fait ce qu'on a à faire avec la base de données...
    await faitDesChoses(client);

} catch (erreur) {
    console.error(erreur);


} finally {
    await client.close();
}
