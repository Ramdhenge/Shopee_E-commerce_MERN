const mongo = require('mongoose')

const UserSch = new mongo.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    cart:{
        type: Array
    }
})

const userCollection = new mongo.model('user', UserSch)

module.exports = userCollection