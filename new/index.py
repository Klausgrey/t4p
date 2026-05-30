import random
data = []

try:
	with open("countries.txt", "r") as file:
		data = [country.strip().lower() for country in file.readlines()]
except FileNotFoundError:
	print("No file found")

def hangman():
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

	print(" ".join(display))

	while True:
		user_guess = input("Enter your guessed word: ").lower()
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
			if num_of_guesses <= 0:
				print(f"wrong guess, you have 0 remaining")
				print("you've exhausted all your guesses")
				return

			print(f"wrong guess, you have {num_of_guesses} remaining")
			continue

		else:
			for index, letter in enumerate(random_countries):
				if letter == user_guess:
					display[index] = user_guess
					guesses_words.append(user_guess)

			print("".join(display))

			if "_" not in display:
				print("congarts you won")
				return
hangman()






