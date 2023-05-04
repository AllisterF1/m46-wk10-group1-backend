const DoneTodo = require("./model")

const addDoneTodo = async(req, res) => {
	try {
        // will use authcheck to get current user ID to ensure todo is being associated with the current user
        // currentUserId = req.authUser.dataValues.id
        // will include id in 201 status too
		const todos = await DoneTodo.create({
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

const deleteDoneTodo = async (req, res) => {
    // will use authcheck to get current user ID to ensure todo is being associated with the current user
    // currentUserId = req.authUser.dataValues.id
    // will include id in 201 status too
	try {
		const todos = await DoneTodo.destroy({
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

module.exports = {addDoneTodo, deleteDoneTodo}