const router = require("express").Router();
const { uuid } = require("uuidv4");
const validate = require("../middleware/authSession");
const Assets = require("../models/assets");

// READ /asset/
router.get("/", async (req, res) => {
	try {
		const assets = await Assets.findAll();
		res.status(200).json(assets);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// READ /asset/:id
router.get("/:id", validate, async (req, res) => {
	try {
		const asset = await Assets.findOne({
			where: {
				asset_tag: req.params.id,
			},
		});
		if (!asset) {
			throw new Error("Asset not found!");
		} else {
			res.status(200).json(asset);
		}
	} catch (error) {
		res.status(500).json({ error });
	}
});

// CREATE  /asset/
router.post("/", validate, async (req, res) => {
	try {
		const asset = await Assets.create({
			asset_tag: uuid(),
			serial_number: req.body.serial_number,
			make: req.body.make,
			series: req.body.series,
			model: req.body.model,
			dev_type: req.body.dev_type,
			form_factor: req.body.form_factor,
		});
		res.status(200).json(asset);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// UPDATE /asset/
router.put("/:id", validate, async (req, res) => {
	try {
		const asset = await Assets.update(
			{
				asset_tag: req.params.id,
				serial_number: req.body.serial_number,
				make: req.body.make,
				series: req.body.series,
				model: req.body.model,
				dev_type: req.body.dev_type,
				form_factor: req.body.form_factor,
			},
			{
				where: {
					asset_tag: req.params.id,
				},
			}
		);
		res.status(200).json(asset);
	} catch (error) {
		res.status(500).json({ error }); // never return in the real world (check it before returning it)!
	}
});

// DELETE /asset/:id
router.delete("/:id", validate, async (req, res) => {
	try {
		await Assets.destroy({
			where: {
				asset_tag: req.params.id,
			},
		});
		res.status(200).json({ message: "Successfully deleted!" });
	} catch (error) {
		res.status(500).json({ error }); // never return in the real world (check it before returning it)!
	}
});

module.exports = router;
