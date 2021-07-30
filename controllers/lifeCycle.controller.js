const router = require("express").Router();
const validate = require("../middleware/authSession");
const LifeCycle = require("../models/lifeCycle");

// READ  /lifecycle/
router.get("/", async (req, res) => {
	try {
		const lifeCycles = await LifeCycle.findAll({
			include: { all: true }, // [Users, LifeCycle, Roles]
		});
		res.status(200).json(lifeCycles);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// READ  /lifecycle/:id
router.get("/:id", validate, async (req, res) => {
	try {
		const lifecycle = await LifeCycle.findByPk(req.params.id);
		if (!lifecycle) {
			throw new Error("Lifecycle not found!");
		} else {
			res.status(200).json(lifecycle);
		}
	} catch (error) {
		res.status(500).json({ error });
	}
});

// CREATE  /lifecycle/
router.post("/", validate, async (req, res) => {
	try {
		const lifecycle = await LifeCycle.create({
			state: req.body.state,
			location: req.body.location,
			assetId: req.body.assetId,
			userId: req.body.userId,
			roleId: req.body.roleId,
			assignedToId: req.body.assignedToId,
		});
		res.status(200).json(lifecycle);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// UPDATE /lifecycle/
router.put("/:id", validate, async (req, res) => {
	try {
		const lifecycle = await LifeCycle.update(
			{
				id: req.params.id,
				state: req.body.state,
				location: req.body.location,
				assetId: req.body.assetId,
				userId: req.body.userId,
				roleId: req.body.roleId,
				assignedToId: req.body.assignedToId,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.status(200).json(lifecycle);
	} catch (error) {
		res.status(500).json({ error }); // never return in the real world (check it before returning it)!
	}
});

// DELETE /lifecycle/:id
router.delete("/:id", validate, async (req, res) => {
	try {
		await LifeCycle.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ message: "Successfully deleted!" });
	} catch (error) {
		res.status(500).json({ error }); // never return in the real world (check it before returning it)!
	}
});

module.exports = router;
