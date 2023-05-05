require("dotenv").config()
const express = require("express")
const cors = require("cors")

const port = process.env.PORT || 5001

const userRouter = require("./users/routes")
const doneTodoRouter = require("./doneTodos/routes")
const activeTodoRouter = require("./activeTodos/routes")

const User = require("./users/model")
const DoneTodo = require("./doneTodos/model")
const ActiveTodo = require("./activeTodos/model")

const app = express()
app.use(cors())

app.use(express.json())

const syncTables = () => {
    User.hasMany(DoneTodo)
    DoneTodo.belongsTo(User)
    User.hasMany(ActiveTodo)
    ActiveTodo.belongsTo(User)
    DoneTodo.sync({alter: true})
    ActiveTodo.sync({alter: true})
    User.sync({})
}

app.use(userRouter)
app.use(doneTodoRouter)
app.use(activeTodoRouter)

app.get("/health", (req, res) => {
    res.status(200).json({message: "api is working"})
})

app.listen(port, () => {
    syncTables()
    console.log(`server is running on port ${port}`)
})