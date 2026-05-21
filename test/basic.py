arr = []


lenght = int(input("Enter the range "))

for i in range(lenght):
	command = input("insert, print, rem, a, s, p, rv ")

	if command.startswith("i"): #works
		# i 2 0
		_, a, b = command.split(" ")
		arr.insert(int(b), a)
	elif command == "print": # still working on this
		print(arr)
	elif command.startswith("rem"):
		a = command.split(" ")[1]
		arr.remove(a)
	elif command.startswith("a"):
		a = command.split(" ")[1]
		arr.append(a)
	elif command == "s":
		arr.sort()
	elif command == "p": #works
		arr.pop()
	elif command == "r":
		arr.reverse()


print(arr)



