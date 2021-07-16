const { DataTypes } = require("sequelize");
const database = require("../db");

const Roles = database.define("roles", {
	role: {
		type: DataTypes.STRING, // "id" will be INTEGER
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
});

module.exports = Roles;
