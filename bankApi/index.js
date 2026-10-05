import authRouter from "./routers/authRouter.js";
import accountRouter from "./routers/accountRouter.js";
import express from "express";

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});