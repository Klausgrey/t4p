import jwt from "jsonwebtoken";
import "dotenv/config";

export function authMiddleware(req, res, next) {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "no token provided" });

	try {
		req.user = jwt.verify(token, process.env.JWT_SECRET);
		next();
	} catch (error) {
		return res.status(403).json({ error: "invalid token" });
	}
}
