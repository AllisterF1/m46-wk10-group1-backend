const {DataTypes} = require("sequelize")
const connection = require("../db/connection")

const ActiveTodo = connection.define("ActiveTodo", {
    completedTasks: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = ActiveTodo