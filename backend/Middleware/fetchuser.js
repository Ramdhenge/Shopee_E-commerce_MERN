const jwt = require('jsonwebtoken')
const key = "aeh8wyr9iuyd78y3248hdfy898ibjnbjbjhhwc"

const fetchuser = (req, res, next)=>{
    //Get the user from jwt token and add id to req object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).json({err:'Invalid Token'})
    }
    try {
        const data = jwt.verify(token, key)
        req.user = data.user
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({err:"Invalid Token"})
    }
}

module.exports = fetchuser