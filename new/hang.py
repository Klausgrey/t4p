import random
def hangman(countries_list):
	score = 0

	while True:
		random_country = random.choice(countries_list)
		if "{" in random_country:
			random_country = random_country.split("{")[0].strip().rstrip(",") # removes any countries that has {} in them

		display = []
		guesses_words = []
		num_of_guesses = 3
		for char in random_country:
			if char in [" ", "-"]:
				display.append(char)
			else:
				display.append("_")

		print("+" + "-"*40 + "+")
		print("|      HANGMAN - COUNTRIES OF THE WORLD    |")
		print("+" + "-"*40 + "+" + "\n")
		print(random_country)
		print(f"Word: {" ".join(display)}\n")
		print(f"Guesses Letter: {" ".join(guesses_words)}\n")

		while "_" in display and num_of_guesses > 0:
			user_guess = input("\nEnter your guessed word: ").lower()
			print("+" + "-"*40 + "+" + "\n")


			if user_guess == "exit":
				print("Thanks for playing")
				print(f"your score is {score}")
				return

			elif not user_guess.isalpha() or len(user_guess) != 1:
				print("Invalid input! Enter a single letter (no numbers or special characters).")
				continue

			elif user_guess in guesses_words:
				print("Enter a letter you haven't entered before")
				continue

			elif user_guess not in random_country:
				num_of_guesses -= 1
				guesses_words.append(user_guess)
				if num_of_guesses <= 0:
					print(f"wrong guess, you have 0 remaining")
					print("you've exhausted all your guesses")
					print(f"your score is {score}")
					break

				print(f"wrong guess, you have {num_of_guesses} remaining\n")
				print("+" + "-"*40 + "+" + "\n")
				print(f"Word: {" ".join(display)}\n")
				print(f"Guesses Letter: {" ".join(guesses_words)}")
				continue

			else:
				for index, letter in enumerate(random_country):
					if letter == user_guess:
						display[index] = user_guess
						guesses_words.append(user_guess)

				print(f"Correct! '{user_guess.upper()}' is in the country name\n")
				print("+" + "-"*40 + "+" + "\n")
				print(f"Word: {" ".join(display)}\n")
				print(f"Guesses Letter: {" ".join(guesses_words)}\n")

			if "_" not in display:
				score += 1
				print("You won")
				print(f"your score is {score}")
				break


