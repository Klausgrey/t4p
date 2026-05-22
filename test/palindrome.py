empty_arr = ""
def take_arr(string):
	str_array = empty_arr.join(list(reversed(string))).lower().replace(" ", "")
	stry = string.lower().replace(" ", "")
	if stry == str_array:
		return True
	else:
		print(f"{stry} {str_array}")
		return False



print(take_arr("A man a plan a canal Panama"))
# print(take_arr("A man a plan a canal Panama"))