const { DataTypes } = require("sequelize");
const database = require("../db");

const Assets = database.define("assets", {
	asset_tag: {
		type: DataTypes.STRING,
		// allowNull: false,
		// unique: true,
	},
	serial_number: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	make: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	series: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	model: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	dev_type: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	form_factor: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: false,
	},
});

module.exports = Assets;
