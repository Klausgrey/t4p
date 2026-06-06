from hang import hangman
data = []
running = True

try:
	with open("countries.txt", "r") as file:
		data = [country.strip().lower() for country in file.readlines()]
except FileNotFoundError:
	print("No file found")

if data:
	hangman(data)
