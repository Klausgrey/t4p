def calPoints(operations):
	total = 0
	arr = []

	for x in operations:
		if x not in ["C", "D", "+"]:
			arr.append(int(x))
		if x == "C":
			arr.pop()
		if x == "D":
			arr.append(2 * arr[-1])
		if x == "+":
			arr.append(arr[-2] + arr[-1])

	for j in arr:
		total += j

	return total


print(calPoints(["5","-2","4","C","D","9","+","+"]))
