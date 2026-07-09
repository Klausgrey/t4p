
def choose_one():
	levels = {
		"easy" : {"max_wrong_guess": 8, "hints": True, "multiplier": 1},
		"medium" : {"max_wrong_guess": 6, "hints": True, "multiplier": 2},
		"hard" : {"max_wrong_guess": 4, "hints": False, "multiplier": 3},
		"expert" : {"max_wrong_guess": 3, "hints": False, "multiplier": 5},
	}

	while True:
		choice = input("Enter level of difficulty: ").lower().strip()
		if choice == "exit":
			return False

		if choice in levels:
			return choice
		else:
			print('please enter a valid level...')
			continue