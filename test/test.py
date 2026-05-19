def is_leap(year):
	leap = False

	# Write your logic here
	if year % 100 != 0:
		if year % 400 == 0:
			leap = True
		else:
			leap = False
	else:
		if year % 4 == 0:
			leap = True
		else:
			leap = False


	return leap

print(is_leap(2008))