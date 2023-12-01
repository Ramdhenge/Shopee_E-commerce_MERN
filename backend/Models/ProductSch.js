const mongo = require('mongoose')

const ProductSch = new mongo.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

const productCollection = new mongo.model('product', ProductSch)

module.exports = productCollection