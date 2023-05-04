const ActiveTodo = require("./model")

const addActiveTodo = async(req, res) => {
    currentUserId = req.authUser.dataValues.id
	try {
		const todos = await ActiveTodo.create({
			todo: req.body.todo,
            UserId: currentUserId
		})
		res.status(201).json({
			message: "success",
			todo: {id: currentUserId, todo: req.body.todo}})
	}
	catch (error) {
		res.status(501).json({message: "error", error: error})
	}
}

const deleteActiveTodo = async (req, res) => {
    currentUserId = req.authUser.dataValues.id
	try {
		const todos = await ActiveTodo.destroy({
			where: {
				todo: req.body.todo,
                UserId: currentUserId
			}
		})
		res.status(204).json({message:"success"})
	}
	catch (error) {
		res.status(501).json({message: "error", error: error})
        res.status(404).json({message: "todo not found"})
	}
}

module.exports = {addActiveTodo, deleteActiveTodo}