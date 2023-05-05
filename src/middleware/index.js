const User = require("../users/model") 

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

const { JsonWebTokenError } = require("jsonwebtoken")
const ActiveTodo = require("../activeTodos/model")
const DoneTodo = require("../doneTodos/model")

const saltRounds = process.env.SALT_ROUNDS

const hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds))
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const comparePass = async (req, res, next) => {
    try {
       

        req.user = await User.findOne({where: {username: req.body.username}, include: [ActiveTodo, DoneTodo]})      

        if (req.user === null) {
            throw new Error ("password or username doesn't match")
        }
        
        // let hashedPassword = req.user.password

        const comparePassword = await bcrypt.compare(req.body.password, req.user.password)

        if(!comparePassword){
            throw new Error ("password or username doesn't match")
        } 
        
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const tokenCheck = async (req, res, next) => {
    try {
        if  (!req.header("Authorization")) {
            throw new Error("No header or token passed in request")
        }
        console.log(req.header("Authorization")) 
        const token = req.header("Authorization").replace("Bearer ", "")
        console.log("!!!!!")
        console.log(token)

        const decodedToken = jwt.verify(token, process.env.SECRET)
        console.log("!!!!!")
        console.log(decodedToken)

        const user = await User.findOne({where: {id: decodedToken.id}, include: [ActiveTodo, DoneTodo]})
        console.log(user)

        console.log("!!!!!!!!!!")
        console.log(user)
        if(!user) {
            throw new error("user is not authorised")
        }
        req.token = token
        req.authUser = user
        
        console.log("!!!!!!!1")
        console.log(req.authUser)
        next()
        
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error}) 
    }
}

module.exports = {
    hashPass,
    comparePass,
    tokenCheck
}
