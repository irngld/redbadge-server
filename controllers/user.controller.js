const router = require("express").Router(); // Absolutes goto the top
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const Users = require("../models/users"); // relatives/locals goto the bottom

// ### EXAMPLE ###
// router.get("/", async (req, res) => {
// 	try {
// 		const user = await Users.findAll({
// 			include: [
// 				{ model: LifeCycle }, // include: { all: true }, // [Users, LifeCycle, Roles]
// 			],
// 		});
// 		restart.status(200).json({ user });
// 	} catch (error) {
// 		res.status(500).json({ error });
// 	}
// });

router.post("/register", (req, res) => {
	Users.create({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 13),
		firstName: req.body.firstName,
		midInit: req.body.midInit,
		lastName: req.body.lastName,
		suffix: req.body.suffix,
		dept: req.body.dept,
		roleId: req.body.roleId,
	})
		.then((user) => {
			let token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
			res.status(200).send({
				user,
				token,
			});
		})
		.catch((error) => {
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
			function generateToken(user) {
				const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
				res.send({ user, token });
			}
			bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
				isMatch ? generateToken(user) : res.send("Login failed!");
			});
		} else {
			res.send("Login failed!");
		}
	});
});

module.exports = router;
