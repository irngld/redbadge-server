const router = require("express").Router();
const validate = require("../middleware/authSession");
const LifeCycle = require("../models/lifeCycle");

router.get("/test", (req, res) => {
	LifeCycle.findAll().then((lifecycle) => res.status(200).json(lifecycle));
	// res.status(200).json("Test complete!");
});

module.exports = router;
