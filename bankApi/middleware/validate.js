export function validate(schema) {
	return (req, res, next) => {
		const { error } = schema.validate(req.body, { abortEarly: false });
		if (error) {
			const errorMessage = error.details.map((d) => d.message);
			return res
				.status(400)
				.json({ error: "Validation failed", details: errorMessage });
		}
		next();
	};
}
