const mongo = require('mongoose')
mongo.connect("mongodb://localhost:27017/E-Commerce")
// .then(()=>{
//     console.log('Database Connected Successfully !');
// })
.catch((err)=>{
    console.log('Something went wrong',err);
})