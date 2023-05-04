const { Router } = require("express")

const userRouter = Router()

const {registerUser, login } = require("./controllers") 
const { hashPass, comparePass, tokenCheck } = require("../middleware")

userRouter.post("/users/register", hashPass, registerUser)

userRouter.post("/users/login", comparePass, login)

userRouter.get("/users/authCheck", tokenCheck, login)




module.exports = userRouter
