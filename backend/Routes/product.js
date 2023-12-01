const exoress = require('express')
const router = exoress.Router()
const Products = require('../Models/ProductSch')
const User = require('../Models/UserSch')
const fetchuser = require('../Middleware/fetchuser')

// Rout 1
// Adding products using "POST" : /api/product/addproduct    *(Optional) Only for admin
router.post('/addproduct', async (req, res) => {
    try {
        const product = await Products.create({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
            description: req.body.description
        })
        res.json({ product })
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
})

// Rout 2
// Get All products using "GET" : /api/product/getproducts    *No login required
router.get('/getproducts', async (req, res) => {
    try {
        const allproducts = await Products.find({})
        res.json(allproducts)
        // console.log(allproducts.length);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
})

// Rout 3
// Get All products by Category using "GET" : /api/product/getproducts:ucategory   *No login required
router.get('/getproducts/:ucategory', async (req, res) => {
    try {
        const allproducts = await Products.find({ category: req.params.ucategory })
        if (allproducts.length === 0) {
            res.json({ msg: `Products Not Found with ${req.params.ucategory} category` })
        }
        else {
            res.json(allproducts)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
})

// Rout 4
// Add to cart using "PUT" : /api/product/addtocart/:productId   *login required
router.put('/addtocart/:productId', fetchuser, async (req, res) => {
    try {
        let success = false
        const productId = req.params.productId
        const product = await Products.findById(productId)
        const userId = req.user.id
        let user = await User.findById(userId).select("-password")
        let cart = user.cart
        // let check = cart.includes(product._id)
        var check = false
        cart.map((val) => {
            if (val._id == productId)
                return check = true
        })
        if (check === true) {
            res.status(409).json({ success, msg: "Already Added to Cart" })
        }
        else {
            cart = cart.push(product)
            user = await User.findByIdAndUpdate(userId, { $set: user }, { new: true })
            success = true
            res.json({ success, user })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
})

// Rout 4
// Remove from cart using "PUT" : /api/product/removefromcart/:productId   *login required
router.put('/removefromcart/:productId', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const productId = req.params.productId
        const product = await Products.findById(productId)

        let user = await User.findById(userId).select("-password")
        let cart = user.cart
        await cart.splice(cart.indexOf(product._id), 1)
        user = await User.findByIdAndUpdate(userId, { $set: user }, { new: true })
        success = true
        res.json({success, cart });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
})

// Rout 5
// Get product by id using "GET" : /api/product/viewproduct/:productId   *No login required
router.get('/viewproduct/:productId', async (req, res) => {
    try {
        const productId = req.params.productId
        const product = await Products.findById(productId)
        res.json(product)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
})

module.exports = router