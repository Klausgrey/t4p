def is_balanced(str):
	stack = []
	arr = {
		")": "(",
		"}": "{",
		"]": "[",
	}

	for x in str:
		if x.isalpha():
			continue
		if x in arr.values():
			stack.append(x)
		elif len(stack) == 0:
			return False
		elif stack[-1] == arr[x]:
			stack.pop()
		else:
			return False

	return len(stack) == 0


print(is_balanced("hello()"))
print(is_balanced("(())"))
print(is_balanced("({[]})"))
print(is_balanced("(]"))