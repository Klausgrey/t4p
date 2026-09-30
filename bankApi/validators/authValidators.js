import Joi from "joi";

export const registerSchema = Joi.object({
	firstName: Joi.string().min(2).max(30).required(),
	lastName: Joi.string().min(2).max(30).required(),
	email: Joi.string()
		.pattern(/^[a-zA-Z]+[0-9]*[a-z]*@[a-zA-Z]+(\.[a-z]{2,3}+$)/)
		.required()
		.lowercase(),
	phone: Joi.string()
		.pattern(/^\+?234|0[7-9][0-1]{8}$/)
		.required(),
	password: Joi.string().min(8).required(),
	confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export const loginSchema = Joi.object({
	email: Joi.string()
		.pattern(/^[a-zA-Z]+[0-9]*[a-z]*@[a-zA-Z]+(\.[a-z]{2,3}+$)/)
		.required()
		.lowercase(),
	password: Joi.string().min(8).required(),
});
