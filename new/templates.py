def header():
	print("+" + "-"*40 + "+")
	print("|      HANGMAN - COUNTRIES OF THE WORLD    |")
	print("+" + "-"*40 + "+" + "\n")

def divider():
	print("+" + "-"*40 + "+" + "\n")

def word_display(display):
	print(f"Word: {' '.join(display)}\n")

def guessesWords(word):
	print(f"Guesses Letter: {' '.join(word)}\n")

def correct_display(user_guess):
	print(f"Correct! '{user_guess.upper()}' is in the country name\n")