import random
data = []

try:
	with open("countries.txt", "r") as file:
		data = [country.strip().lower() for country in file.readlines()]
except FileNotFoundError:
	print("No file found")

def hangman():
	print("+" + "-"*40 + "+")
	print("|      HANGMAN - COUNTRIES OF THE WORLD    |")
	print("+" + "-"*40 + "+" + "\n")
	display = []
	guesses_words = []
	random_countries = random.choice(data)
	num_of_guesses = 3
	print(random_countries)

	if "{" in random_countries:
		random_countries = random_countries.split("{")[0].strip().rstrip(",") # removes any countries that has {} in them

	for char in random_countries:
		if char in [" ", "-"]:
			display.append(char)
		else:
			display.append("_")

	print(f"Word: {" ".join(display)}\n")
	print(f"Guesses Letter: {" ".join(guesses_words)}\n")

	while True:
		user_guess = input("\nEnter your guessed word: ").lower()
		print("+" + "-"*40 + "+" + "\n")
		if user_guess == "exit":
			print("Thanks for playing")
			return

		elif not user_guess.isalpha() or len(user_guess) != 1:
			print("Invalid input! Enter a single letter (no numbers or special characters).")
			continue

		elif user_guess in guesses_words:
			print("Enter a letter you haven't entered before")
			continue

		elif user_guess not in random_countries:
			num_of_guesses -= 1
			guesses_words.append(user_guess)
			if num_of_guesses <= 0:
				print(f"wrong guess, you have 0 remaining")
				print("you've exhausted all your guesses")
				return

			print(f"wrong guess, you have {num_of_guesses} remaining\n")
			print("+" + "-"*40 + "+" + "\n")
			print(f"Word: {" ".join(display)}\n")
			print(f"Guesses Letter: {" ".join(guesses_words)}")

			continue

		else:
			for index, letter in enumerate(random_countries):
				if letter == user_guess:
					display[index] = user_guess
					guesses_words.append(user_guess)

			print(f"Correct! '{user_guess.upper()}' is in the country name\n")
			print("+" + "-"*40 + "+" + "\n")
			print(f"Word: {" ".join(display)}\n")
			print(f"Guesses Letter: {" ".join(guesses_words)}\n")


			if "_" not in display:
				print("You won")
				return



hangman()
