import random
data = []

files = open("countries.txt", 'r')
if files == None:
	print("file doesn't exist")
	exit(1)

for line in files.readlines():
	data.append(line.strip())

word = random.choice(data).lower()
print(word)
display = ["_"] * len(word) # to get the total words and display them in _ format

number_of_guess = 0
while "_" in display and number_of_guess < 3:

	guesses = input("enter one letter(guess): ").lower()
	if not guesses.isalpha():
		if (3 - number_of_guess) == 1:
			break
		else:
			print("stop trying to break my code and enter a letter only, t for thanks")
			number_of_guess += 1
			print(f"You have {(3 - number_of_guess)} more trials")
			continue
	if len(guesses) != 1:
		print("can't you read, i said enter only one letter")
		number_of_guess += 1
		print(f"You have {(3 - number_of_guess)} more trials")
		continue
	if guesses not in word:
		number_of_guess += 1
		print(f"You have {(3 - number_of_guess)} more trials")
	elif guesses in word:
		for i in range(len(word)):
			if word[i].lower() == guesses.lower():
				display[i] = word[i]
		print(" ".join(display))


if "_" not in display:
	print(f"You won")
else:
	print(f"You lost, the country was {word}")



