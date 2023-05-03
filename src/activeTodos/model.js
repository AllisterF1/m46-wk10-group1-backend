const {DataTypes} = require("sequelize")
const connection = require("../db/connection")

const ActiveTodo = connection.define("ActiveTodo", {
    todo: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = ActiveTodo