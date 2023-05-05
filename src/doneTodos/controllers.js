const DoneTodo = require("./model")

const addDoneTodo = async(req, res) => {
    currentUserId = req.authUser.dataValues.id
	try {
		const todos = await DoneTodo.create({
			todo: req.body.todo,
            UserId: currentUserId
		})
		res.status(201).json({
			message: "success",
			todo: {id: todos.id, todo: req.body.todo}})
	}
	catch (error) {
		res.status(501).json({message: "error", error: error})
	}
}

const deleteDoneTodo = async (req, res) => {
	try {
		const todos = await DoneTodo.destroy({
			where: {
				id: req.body.id,
			}
		})
		res.status(204).json({message:"success"})
	}
	catch (error) {
		res.status(501).json({message: "error", error: error})
        res.status(404).json({message: "todo not found"})
	}
}

module.exports = {addDoneTodo, deleteDoneTodo}