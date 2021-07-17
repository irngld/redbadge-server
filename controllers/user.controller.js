const router = require("express").Router();
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

router.get("/", async (req, res) => {
	try {
		const user = await Users.findAll({
			include: [
				{ model: Message }, // optional { all: true }
			],
		});
		restart.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.post("/register", (req, res) => {
	// const { email, password, firstName, lastName, roleID } = req.body;
	Users.create({
		email: "iaingould@email.com",
		password: "password", // bcrypt.hashSync(req.body.password, 13),
		firstName: "Iain",
		midInit: "",
		lastName: "Gould",
		suffix: "",
		dept: "",
		roleID: 3,
	})
		.then((user) => {
			let token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
			res.send({
				user,
				token,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send({
				message: "User not created",
				error: error.errors[0].message,
			});
		});
});

router.post("/login", (req, res) => {
	Users.findOne({
		where: {
			email: req.body.email,
		},
	}).then((user) => {
		if (user) {
			//  compare passwords
			bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
				isMatch ? generateToken(user) : res.send("Incorrect Password");
			});
			function generateToken(user) {
				let token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
				console.log(token);
				res.send({ user, token });
			}
		} else {
			res.send("Login failed!");
		}
	});
});

module.exports = router;
