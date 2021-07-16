const Roles = require("./roles");

const { DataTypes, CHAR } = require("sequelize");
const database = require("../db");

const Users = database.define("users", {
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	firstName: {
		type: DataTypes.STRING(20),
		allowNull: false,
		unique: false,
	},
	midInit: {
		type: DataTypes.STRING(5),
		allowNull: true,
	},
	lastName: {
		type: DataTypes.STRING(20),
		allowNull: false,
		unique: false,
	},
	suffix: {
		type: DataTypes.STRING(5),
		allowNull: true,
	},
	title: {
		type: DataTypes.STRING(5),
		allowNull: true,
	},
	dept: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	roleID: {
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: false,
		// defaultValue:
	},
});

Users.hasOne(Roles);
Roles.belongsToMany(Users);

exports.default = Users;
