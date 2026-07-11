import random
import templates
import profiles
import learderboard
import difficulty

def hangman(countries_list):
	templates.banner()
	learderboard.show_leaderboard()

	players_details = profiles.get_player_name()
	if players_details == False:
		print("Exitting...")
		return

	score = players_details["score"]

	level_name, level_settings = difficulty.choose_one()
	if level_name == None:
		print('thanks for playing..')
		return


	while True:
		random_country_data = random.choice(countries_list)
		random_country = random_country_data["name"].lower()
		if "{" in random_country:
			random_country = random_country.split("{")[0].strip().rstrip(",") # removes any countries that has {} in them

		display = []
		guesses_words = []
		hints_used = False
		num_of_guesses = level_settings['max_wrong_guesses']
		for char in random_country:
			if char in [" ", "-"]:
				display.append(char)
			else:
				display.append("_")

		templates.header()

		print(random_country)
		templates.game_state(display, guesses_words, num_of_guesses, score)

		while "_" in display and num_of_guesses > 0:
			templates.guess_prompt()
			user_guess = input("> ").lower()
			templates.divider()

			if user_guess == "exit":
				print("Thanks for playing")
				print(f"your score is {score}")
				profiles.save_score(players_details["name"], score)
				learderboard.show_leaderboard()
				return

			elif user_guess == "?":
				if not level_settings['hints']:
					print('hint not available at this level...')
				elif hints_used:
					print("Hint already used for this round.\n")
				else:
					print(f"{random_country_data['fact']}\n")
					hints_used = True
				continue

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
					templates.failed_display(random_country, score)
					profiles.save_score(players_details["name"], score)
					break

				print(f"wrong guess, you have {num_of_guesses} remaining\n")
				templates.divider()
				templates.game_state(display, guesses_words, num_of_guesses, score)
				continue

			else:
				for index, letter in enumerate(random_country):
					if letter == user_guess:
						display[index] = user_guess
						guesses_words.append(user_guess)

				templates.correct_display(user_guess)
				templates.divider()
				templates.game_state(display, guesses_words, num_of_guesses, score)

			if "_" not in display:
				score += 1
				templates.won_display(random_country, score)
				profiles.save_score(players_details["name"], score)
				break