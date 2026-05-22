def magic(string, position, char):
	"""
	I learnt here that strings are imutable and must be converted to a list before one can manipulate it
	and
	"".join(list) converts a list back to a string in this case
	"""
	new_list = list(string)
	new_list[position] = char
	s = "".join(new_list)
	return s


print(magic("Nicholas", 0, "A"))