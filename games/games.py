import random
data = []
score = 0

files = open("countries.txt", 'r')
if files == None:
	print("file doesn't exist")
	exit(1)

for line in files.readlines():
	data.append(line.strip())

exit_game = False
while not exit_game:
	word = random.choice(data).lower()
	guessed = []
	print(word)
	# display = ["_"] * len(word)
	display = []
	for char in word:
		if char in [" ", "-", "{", "}"]:
			display.append(char)
		else:
			display.append("_")
	print(" ".join(display)) # to get the total words and display them in _ format

	number_of_guess = 0
	while "_" in display and number_of_guess < 3:

		guesses = input("enter one letter(guess): ").lower()
		if guesses == "exit":
			exit_game = True
			break
		elif not guesses.isalpha():
			print("Please enter letters not numbers")
			number_of_guess += 1
			print(f"You have {(3 - number_of_guess)} more trials")
			continue
		elif len(guesses) != 1:
			print("can't you read, i said enter only one letter")
			number_of_guess += 1
			print(f"You have {(3 - number_of_guess)} more trials")
			continue
		elif guesses in guessed:
			print(f"you have guessed this word before try again")
			continue
		else:
			guessed.append(guesses)

		if guesses not in word.replace(" ", "").replace("-", "").replace("{", "").replace("}", ""):
			number_of_guess += 1
			print(f"You have {(3 - number_of_guess)} more trials")
		elif guesses in word.replace(" ", "").replace("-", "").replace("{", "").replace("}", ""):
			for i in range(len(word)):
				if word[i].lower() == guesses.lower():
					display[i] = word[i]
			print(" ".join(display))


	if "_" not in display:
		score += 1
		print(f"You won, your score is {score}\n")
	elif exit_game == True:
		print(f"Thanks for playing, your total score is {score}")
	else:
		print(f"You lost, the country was {word}")



