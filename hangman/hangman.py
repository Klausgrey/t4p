import random
import templates
import profiles
import learderboard

def hangman(countries_list):
	learderboard.show_leaderboard()
	players_details = profiles.get_player_name()
	if players_details == False:
		print("Exitting...")
		learderboard.show_leaderboard()
		return

	score = players_details["score"]

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

		templates.header()

		print(random_country)
		templates.word_display(display)
		templates.guessesWords(guesses_words)

		while "_" in display and num_of_guesses > 0:
			user_guess = input("\nEnter your guessed word: ").lower()
			templates.divider()

			if user_guess == "exit":
				print("Thanks for playing")
				print(f"your score is {score}")
				profiles.save_score(players_details["name"], score)
				learderboard.show_leaderboard()
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
					profiles.save_score(players_details["name"], score)
					break

				print(f"wrong guess, you have {num_of_guesses} remaining\n")
				templates.divider()
				templates.word_display(display)
				templates.guessesWords(guesses_words)
				continue

			else:
				for index, letter in enumerate(random_country):
					if letter == user_guess:
						display[index] = user_guess
						guesses_words.append(user_guess)

				templates.correct_display(user_guess)
				templates.divider()
				templates.word_display(display)
				templates.guessesWords(guesses_words)

			if "_" not in display:
				score += 1
				print("You won")
				print(f"your score is {score}")
				profiles.save_score(players_details["name"], score)
				break