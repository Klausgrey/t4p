export const validateBody = (requiredField) => {
	return (req, res, next) => {
		if (!req.body)
			return res.status(400).json({ error: "Request body cannot be empty" });
		const missenFields = [];

		for (const field of requiredField) {
			const value = req.body[field];

			if (value === undefined || value === null || String(value).trim() === "")
				missenFields.push(field);
		}

		if (missenFields.length > 0)
			return res
				.status(400)
				.json({ error: `missing required field: ${missenFields.join(",")}` });
		next();
	};
};
