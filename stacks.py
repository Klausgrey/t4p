def is_balanced(str):
	stack = []
	arr = {
		")": "(",
		"}": "{",
		"]": "[",
	}

	for x in str:
		if x in arr.values():
			stack.append(x)
		elif x == arr:
			stack.pop()
		else:
			return False

	return len(stack) == 0
