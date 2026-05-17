a_list = [1,1,3,4,5,5,]

a_dict = {}

for x in a_list:
	if x not in a_dict:
		a_dict[x] = 1
	else:
		a_dict[x] += 1

for key, value in a_dict.items():
	if value > 1:
		print(f"({key})", end='')

