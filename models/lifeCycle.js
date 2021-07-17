const Assets = require("./assets");
const Users = require("./users");
const Roles = require("./roles");

const { DataTypes } = require("sequelize");
const database = require("../db");

const LifeCycle = database.define("lifeCycle", {
	userID: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	assetTag: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	state: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	location: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
});

Assets.hasMany(LifeCycle);
LifeCycle.belongsTo(Assets); // belongsTo adds an "ID", I want to have a key to link it to the table that it belongs to

Users.hasMany(LifeCycle);
LifeCycle.belongsTo(Users);

// LifeCycle.hasOne(Roles);
// Roles.belongsToMany(LifeCycle);

module.exports = LifeCycle;
