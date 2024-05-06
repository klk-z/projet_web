const dbName="asso";
const newMessage = {
    author_id: "158",
    author_name: "machin",
    date: " XXX ",
    text: "Voilà le texte du commentaire"
}
const insertMessage = await client.db(dbName).collection("messages").insertOne(newMessage);

const cursorListMessages = await client.db("asso").collection("messages").find();
// Pour afficher en console, il faut transformer le cursor en array
const arrayListMessages = await cursorListMessages.toArray();
console.log(arrayListMessages);