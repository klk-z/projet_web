const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {type: String, 
        unique: true,
        minLength: 5},
    password : {type: String},
    firstname : {type: String},
    lastname : {type: String},
    isBanned : {type: Boolean},
    isAdmin : {type: Boolean},
    newUser : {type: Boolean}
    //profilePicture : Image
})

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;