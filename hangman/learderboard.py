import json
import os


def get_sorted_entries():
	if os.path.exists("leaderboard.json"):
		with open("leaderboard.json", "r") as f:
			entries = json.load(f)
	else:
		entries = []

	entries.sort(key=lambda entry: entry["score"], reverse=True)
	return entries


def show_leaderboard():
	entries = get_sorted_entries()

	print("+" + "-"*40 + "+")
	print("|              LEADERBOARD              |")
	print("+" + "-"*40 + "+")

	if not entries:
		print("|            No players yet             |")
		print("+" + "-"*40 + "+" + "\n")
		return

	print(f"| {'Rank':<6}| {'Name':<15}| {'Score':<14}|")
	print("+" + "-"*40 + "+")

	for i, entry in enumerate(entries):
		rank = i + 1
		print(f"| {rank:<6}| {entry['name']:<15}| {entry['score']:<14}|")

	print("+" + "-"*40 + "+" + "\n")