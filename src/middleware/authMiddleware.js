import Jwt from "jsonwebtoken";
import "dotenv/config";
const jwt = Jwt;

export const verifytoken = (req, res, next) => {
	try {
		const header = req.headers["authorization"];
		if (!header) res.status(401).json({ error: "token was not provided..." });

		const token = header.split(" ")[1];
		if (!token) res.status(401).json({ error: "access token required" });

		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next()
	} catch (err) {
		if (error.name === "TokenExpiredError")
			return res.status(401).json({ error: "Token has expired..." });
		if (error.name === "JsonWebTokenError")
			return res.status(403).json({ error: "Invalid token..." });
		return res.status(500).json({ error: "Token verification failed" });
	}
};
