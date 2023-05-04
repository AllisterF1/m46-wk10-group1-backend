const ActiveTodo = require("./model")

const addActiveTodo = async(req, res) => {
	try {
        // will use authcheck to get current user ID to ensure todo is being associated with the current user
        // currentUserId = req.authUser.dataValues.id
        // will include id in 201 status too
		const todos = await ActiveTodo.create({
			todo: req.body.todo
		})
		res.status(201).json({
			message: "success",
			todo: {todo: req.body.todo}})
	}
	catch (error) {
		res.status(501).json({message: "error", error: error})
	}
}

const deleteActiveTodo = async (req, res) => {
    // will use authcheck to get current user ID to ensure todo is being associated with the current user
    // currentUserId = req.authUser.dataValues.id
    // will include id in 201 status too
	try {
		const todos = await ActiveTodo.destroy({
			where: {
				todo: req.body.todo,
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