const router = require("express").Router();

router.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "here are all the admin users",
	});
});

module.exports = router;
