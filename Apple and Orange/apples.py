apples = [-2, 2, 1]
oranges = [5, -6]
a, b, s, t = 5, 15, 7, 11
count_for_apples = 0
count_for_oranges = 0

for i in range(len(apples)):
	apples[i] = apples[i] + a

for j in range(len(oranges)):
	oranges[j] = oranges[j] + b

for num in apples:
	if num >= s and num <= t:
		count_for_apples += 1

for num_j in oranges:
	if num_j >= s and num_j <= t:
		count_for_oranges += 1



print(f"{count_for_apples}\n{count_for_oranges}")