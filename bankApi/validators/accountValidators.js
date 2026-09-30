import Joi from 'joi';

export const accountSchema = Joi.object({
	accountType: Joi.string().valid('savings', "current", "fixed").required(),
	currency: Joi.string().pattern(/^[A-Z]{3}$/).optional().default('NGN'),
})

export const depositWithdrawSchema = Joi.object({
	account_number: Joi.string().length(10).required(),
	amount: Joi.number().greater(0).precision(2).required(),
	description: Joi.string().max(255).optional(),
})

export const transferSchema = Joi.object({
	fromAccountNumber: Joi.string().length(10).required(),
	toAccountNumber: Joi.string().length(10).required().invalid(Joi.ref('fromAccountNumber')),
	amount: Joi.number().greater(0).precision(2).required(),
	description: Joi.string().max(255).optional(),
})
