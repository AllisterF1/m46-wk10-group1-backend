const { Router } = require("express")
const activeTodoRouter = Router()
const {addActiveTodo, deleteActiveTodo} = require("./controllers")
const {tokenCheck} = require("../middleware")

activeTodoRouter.post("/activetodos/addtodo", tokenCheck, addActiveTodo)
activeTodoRouter.post("/activetodos/deleteactivetodo", tokenCheck, deleteActiveTodo)

module.exports = activeTodoRouter