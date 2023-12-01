const express = require('express')
const app = express()
const port = 5000
require('./db')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./Routes/auth'))
app.use('/api/product',require('./Routes/product'))

app.listen(port,()=>{
    console.log('Server has been started');
})