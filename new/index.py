import random
countries = open("countries.txt", "r")
data = []
display = []

for country in countries.readlines():
	data.append(country.strip().lower())

def hangman():
	guesses_words = []
	random_countries = random.choice(data)
	# random_countries = "El Salvador"
	print(random_countries)

	if "{" in random_countries:
		random_countries = random_countries.split("{")[0].strip().rstrip(",") # removes any countries that has {} in them

	for char in random_countries:
		if char in [" ", "-"]:
			display.append(char)
		else:
			display.append("_")

	print(" ".join(display))
	num_of_guesses = 3

	while True:
		user_guess = input("Enter your guessed word: ").lower()
		if user_guess == "exit":
			print("Thanks for playing")
			return
		elif not user_guess.isalpha():
			print("Enter a word not a number or special character ")
			continue
		elif len(user_guess) < 1 or len(user_guess) > 1:
			print("Enter just one word ")
			continue
		elif user_guess in guesses_words:
			print("Enter a word you haven't entered before")
			continue
		elif user_guess not in random_countries:
			print(f"wrong guess, you have {num_of_guesses} remaining")
			num_of_guesses -= 1
			if num_of_guesses <= 0:
				print(f"wrong guess, you have 0 remaining")
				print("you've exhausted all your guesses")
				return
			continue
		else:
			for index, letter in enumerate(random_countries):
				if letter == user_guess:
					display[index] = user_guess
					guesses_words.append(user_guess)
					print(display)
			continue

		# return print(display)


hangman()






