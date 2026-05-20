# import re

# pattern = r"[\w]+@[\w]+\.[\w]+"
# email = "danielnick210@gmail.com"

# match = re.match(pattern, email)
# print(match)


invalid = 'B1CD102354'
valid = 'B1CDEF2354'

def is_valid(uid):
	if len(uid) != 10:
		return False
	if not uid.isalnum():
		return False
	if sum(1 for x in uid if x.isupper()) < 2:
		return False
	if sum(1 for x in uid if x.isdigit()) < 3:
		return False
	if len(set(uid)) != len(uid):
		print(len(set(uid)), len(uid))
		return False

	return True

# n = int(input())
# for _ in range(n):
#     line = input()
#     print(is_valid(line))

print(is_valid(invalid))
print(is_valid(valid))