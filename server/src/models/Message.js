const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    username : {type: String}, 
    // id ?
    title : {type: String},
    content : {type: String},
    author : {type: String}, //username
    isAdmin : {type: Boolean},
    date : {type : Date}
    //comment : 
})

const MessageModel = mongoose.model("messages", MessageSchema);
module.exports = MessageModel;