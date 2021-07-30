const Assets = require("./assets");
const Users = require("./users");
const Roles = require("./roles");

const { DataTypes } = require("sequelize");
const database = require("../db");

const LifeCycle = database.define("lifeCycle", {
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
LifeCycle.belongsTo(Assets); // belongsTo adds an "ID". Used to link table it belongs to

Users.hasMany(LifeCycle);
LifeCycle.belongsTo(Users);
// Users.hasMany(LifeCycle, {
// 	as: "assigned",
// });
LifeCycle.belongsTo(Users, {
	as: "assignedTo",
	foreignkey: "assignedToId",
});

// LifeCycle.hasOne(Roles);
Roles.hasMany(LifeCycle);
LifeCycle.belongsTo(Roles);
// Roles.belongsToMany(LifeCycle);
// LifeCycle.belongsToMany(Roles, {
// 	through: "<insert_name>",
// 	as: "<insert_name>",
// 	foreignKey: "_id",
// });

module.exports = LifeCycle;
