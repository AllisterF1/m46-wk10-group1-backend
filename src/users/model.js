const {DataTypes} = require("sequelize")
const connection = require("../db/connection")

const User = connection.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
},
{indexes: [{unique:true, fields: ["username", "email"]}]})

module.exports = User