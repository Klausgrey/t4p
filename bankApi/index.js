import authRouter from "./router.js";
import express from "express";

const app = express();
app.use(express.json());
app.use("/api", authRouter);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});