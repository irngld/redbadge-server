const Sequelize = require("sequelize");
// const DB = process.env.DB;
// const DB_PW = process.env.DB_PW;

const db = new Sequelize(process.env.DATABASE_URL, {
	dialect: "postgres",
	ssl: true,
	host: "localhost",
	logging: true,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

module.exports = db;
