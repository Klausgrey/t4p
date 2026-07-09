
def choose_one():
	levels = {
		"easy" : {"max_wrong_guesses": 8, "hints": True, "multiplier": 1},
		"medium" : {"max_wrong_guesses": 6, "hints": True, "multiplier": 2},
		"hard" : {"max_wrong_guesses": 4, "hints": False, "multiplier": 3},
		"expert" : {"max_wrong_guesses": 3, "hints": False, "multiplier": 5},
	}

	while True:
		choice = input("Enter level of difficulty: ").lower().strip()
		if choice == "exit":
			return None, None

		if choice in levels:
			return choice, levels[choice]
		else:
			print('please enter a valid level...')
			continue