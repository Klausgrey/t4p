import express from "express";
import authRouter from "./src/routers/auth.router.js";
import noteRouter from "./src/routers/note.router.js";
const app = express();

app.use(express.json());
app.use("/users", authRouter);
app.use("/notes", noteRouter);

export default app;
