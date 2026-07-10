from hangman import hangman
import json
data = []
running = True

try:
	with open("countries.json", "r") as file:
		data = json.load(file)
except FileNotFoundError:
	print("No file found")

if data:
	hangman(data)
