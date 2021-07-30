const Roles = require("./roles");

const { DataTypes } = require("sequelize");
const database = require("../db");

const Users = database.define("users", {
	email: {
		type: DataTypes.STRING,
		allowNull: true, //false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: true, //false,
		unique: false,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: true, //false,
		unique: false,
	},
	midInit: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: true, //false,
		unique: false,
	},
	suffix: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	dept: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	roleId: {
		type: DataTypes.INTEGER,
		allowNull: true, //false,
		unique: false,
		// defaultValue:
	},
});

Roles.hasMany(Users);
Users.belongsTo(Roles); // A user will only have one role

module.exports = Users;
