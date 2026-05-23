s = "#$%@^&*kjnk svskjnbui h 4oi3hheuh /dfh uidshvhdsuihv suihc 0hrem89m4c02mw4xo;,wh fwhncoishmxlxfkjsahnxu83v 08 n8OHOIHIOMOICWHOFCMHEOFMCOEJMC0J09C 03J J3L;JMFC3JM3JC3'JIOO9MMJ099U N090N9 OOHOLNHNLLKNLKNKNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333000000000000000000000000000000000000000000000000000000000000000000000000000"




# res4 = sum(1 for x in s if x.isalnum())
# if res4 >= 1:
# 	print("True")
# else:
# 	print("False")

# res2 = sum(1 for x in s if x.isalpha())
# if res2 >= 1:
# 	print("True")
# else:
# 	print("False")

# res3 = sum(1 for x in s if x.isdigit())
# if res3 >= 1:
# 	print("True")
# else:
# 	print("False")

# res1 = sum(1 for x in s if x.islower())
# if res1 >= 1:
# 	print("True")
# else:
# 	print("False")

# res = sum(1 for x in s if x.isupper())
# if res >= 1:
# 	print("True")
# else:
# 	print("False")

checks = ["isalnum", "isalpha", "isdigit", "islower", "isupper"]

for check in checks:
	if any(getattr(char, check)() for char in s):
		print("True")
	else:
		print("False")

for method in ["isalnum", "isalpha", "isdigit", "islower", "isupper"]:
	print(any(getattr(char, method)() for char in s))