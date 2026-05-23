def example(string, sub_string):
	count = 0

	for x in range(len(string)):
		if sub_string == string[x:x + len(sub_string)]:
			count += 1
	return count


print(example("ABCDCDC", "CDC"))