import re

def checker(s):

	if not isinstance(s, str):
		return False

	reg = r"^[+-]?\d*\.\d+$"
# ^        → start of string
# [+-]?    → optionally match + or - (the ? makes it optional)
# \d*      → zero or more digits (the part before the dot)
# \.       → literal dot (escaped because . alone means "any character")
# \d+      → one or more digits (the part after the dot)
# $        → end of string

	if re.match(reg, s):
		return True
	else:
		return False


print(checker("4.0O0"))
print(checker("-1.00"))
print(checker("+4.54"))
print(checker("+12."))
print(checker("-+4.5"))
print(checker("SomeRandomStuff"))
