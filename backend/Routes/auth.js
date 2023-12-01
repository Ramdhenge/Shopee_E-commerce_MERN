const express = require('express')
const router = express.Router()
const usersch = require('../Models/UserSch')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const key = "aeh8wyr9iuyd78y3248hdfy898ibjnbjbjhhwc"
const jwt = require('jsonwebtoken')
const fetchuser = require('../Middleware/fetchuser')

// Rout 1
// Create User using "POST" : /api/auth/createuser    *no login required
router.post('/createuser', [
    body('name', 'Name should have 3 charactors').isLength({ min: 3 }),
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password should have 3 charactors').isLength({ min: 3 })
], async (req, res) => {
    let success = false
    let err = validationResult(req)
    //If there are any errors then returns Bad request
    if (!err.isEmpty()) {
        res.status(400).json({ success, err: err.array() })
    }
    try {
        // check email already exist or not
        let user = await usersch.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({ success, err: 'Email alrready exist' })
        }
        // If everything is ok then create user
        else {
            const salt = await bcrypt.genSalt(10)
            const securePassword = await bcrypt.hash(req.body.password, salt)
            
            user = await usersch.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
                cart: []
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, key)
            success = true
            res.json({ success, authtoken });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
})

// Rout 2
// Login User using "POST" : /api/auth/login    *no login required
router.post('/login', async (req, res) => {
    let success = false
    try {
        const { email, password } = req.body
        let user = await usersch.findOne({ email })
        if (!user) {
            return res.status(500).json({success, err: 'Ivalid Credentials' })
        }
        else {
            const bcryptpassword = await bcrypt.compare(password, user.password)
            if (!bcryptpassword) {
                return res.status(500).json({success, err: 'Ivalid Credentials' })
            }
            else {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authtoken = jwt.sign(data, key)
                success = true
                res.json({success, authtoken });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
})

// Rout 3
// Get the data of Logged in User using "POST" : /api/auth/getdata    *login required
router.post('/getdata', fetchuser, async (req, res) => {
    try {
        // get access of all fields of user, except password
        const userId = req.user.id
        const userdata = await usersch.findById(userId).select("-password")
        res.send(userdata)
        // console.log(userdata.cart);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
})

// Rout 4
// Get cart data of Logged in User using "POST" : /api/auth/mycart    *login required
router.post('/mycart', fetchuser, async (req, res) => {
    try {
        // get access of all fields of user, except password
        const userId = req.user.id
        const userdata = await usersch.findById(userId).select("-password")
        res.send(userdata.cart)
        // console.log(userdata.cart);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
})


module.exports = router