const express = require("express");
const userRouter = require("./users");
const adminRouter = require("./admin");

const PORT = 501;

const app = express();

// middleware -> app.use
app.use(express.json());

app.use("/api/v1/users/", userRouter);
app.use("/admins", adminRouter);

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Thank you for visiting!",
		query: req.query,
	});
});

// invalid routes
app.use((req, res) => {
	res.status(404).json({
		status: false,
		message: "Sorry, we do not have anything on this route!",
		data: {
			method: req.method,
			date: new Date().toISOString(),
		},
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
