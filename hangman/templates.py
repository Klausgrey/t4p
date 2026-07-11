def header():
	print("+" + "-"*40 + "+")
	print("|      HANGMAN - COUNTRIES OF THE WORLD    |")
	print("+" + "-"*40 + "+" + "\n")

def divider():
	print("+" + "-"*40 + "+" + "\n")


def correct_display(user_guess):
	print(f"Correct! '{user_guess.upper()}' is in the country name\n")

def banner():
	print("""
	╔══════════════════════════════════════════════════╗
	║                                                    ║
	║        H A N G M A N   —   C O U N T R I E S       ║
	║              O F   T H E   W O R L D                ║
	║                                                    ║
	╚══════════════════════════════════════════════════╝
	""")

def name_prompt():
	print("+" + "-"*40 + "+")
	print("|" + " "*13 + "PLAYER SETUP" + " "*15 + "|")
	print("+" + "-"*40 + "+")


def guess_prompt():
	print(f"┌─  Enter a letter (or '?' for a hint): ")

def failed_display(country_name, score):
	print("+" + "-"*40 + "+")
	print("|" + " "*14 + "GAME OVER" + " "*17 + "|")
	print("+" + "-"*40 + "+")
	print(f"| Country was: {country_name.upper():<25}|")
	print(f"| Your score:  {score:<25}|")
	print("+" + "-"*40 + "+")

def won_display(country_name, score):
	print("+" + "-"*40 + "+")
	print("|" + " "*15 + "YOU WON!" + " "*17 + "|")
	print("+" + "-"*40 + "+")
	print(f"| Country:     {country_name.upper():<25}|")
	print(f"| Your score:  {score:<25}|")
	print("+" + "-"*40 + "+")

def game_state(display, guesses_words, guesses_left, score):
	print(f"Word:  {' '.join(display)}\n")
	print(f"Guessed Letters:  {'  '.join(sorted(guesses_words))}\n")
	print(f"Incorrect Guesses Remaining: {guesses_left}")
	print(f"Score: {score:,}\n")