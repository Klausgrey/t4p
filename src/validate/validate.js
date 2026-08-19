import Joi from "joi";
const PATTERN = /^[a-z0-9!#$%&'*+\-/=?^_`{|}~.]+@[a-z0-9-]+\.[a-z]{2,}$/i;
// the local part
//comes after the @
// must contain characters
// accept upper and lower cases
// all this characters are allowed
// ! # $ % & ' * + - / = ? ^ _ ` { | } ~ .
// period cannot appear twice except it is in ""
//no space between chracters except the whole local part is in quotes

// @symbol
//must not apear twice

// domain part
// Can contain only a letter, number, or hyphen,

export const emailVerify = Joi.object({
	email: Joi.string().pattern(PATTERN),
});
