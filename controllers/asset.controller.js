const router = require("express").Router();
const { Asset } = require("../db");
const { uuid } = require("uuidv4");
const validate = require("../middleware/authSession");

router.get("/", async (req, res) => {
	try {
		const assets = await Asset.findAll();

		restart.status(200).json({ assets });
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.get("/asset", validate, async (req, res) => {
	try {
		const assets = await Asset.findOne({
			where: {
				// email: req.body.email,
				asset_tag: "d0cd384c-e064-11eb-95d0-7b32dd39c3b4",
			},
		});
		res.status(200).json({ assets });
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.post("/", validate, async (req, res) => {
	req.body.asset_tag = uuid(); // assetTag.split('-')[0].toUpperCase();
	console.log(req.body.asset_tag);
	try {
		const asset = await Asset.create(req.body);

		if (asset) {
			res.status(200).json({ message: "Created asset", asset });
		} else {
			res.status(404).json({ message: "Could not create" });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
});

module.exports = router;
