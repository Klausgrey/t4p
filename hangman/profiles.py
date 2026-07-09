import os
import json

def get_player_name():
	while True:
		player_name = input("Enter your username: ").strip().lower()
		if player_name == "exit":
			return False

		if not player_name.isalpha():
			print("Enter a valid name")
			continue
		else:
			if os.path.exists("leaderboard.json"):
				with open("leaderboard.json", "r") as f:
					entries = json.load(f)
			else:
				entries = []

			for i in range(len(entries)):
					if entries[i]["name"] == player_name:
						return entries[i]

			new_user = {"name": player_name, "score": 0}
			entries.append(new_user)
			with open("leaderboard.json", "w") as f:
				json.dump(entries, f, indent=4)
			return entries[len(entries) - 1]


def save_score(name, score):
	with open("leaderboard.json", "r") as f:
		entries = json.load(f)

	for i in range(len(entries)):
		if entries[i]["name"] == name:
			entries[i]["score"] = score

	with open("leaderboard.json", "w") as f:
		json.dump(entries, f, indent=4)
		f.close()
		return entries[i]
