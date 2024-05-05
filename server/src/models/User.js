const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    firstname : String,
    lastname : String,
    isAccepted : Boolean,
    isAdmin : Boolean
    //profilePicture : Image
})

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;