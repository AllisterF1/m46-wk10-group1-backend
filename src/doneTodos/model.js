const {DataTypes} = require("sequelize")
const connection = require("../db/connection")

const DoneTodo = connection.define("DoneTodo", {
    completedTasks: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = DoneTodo