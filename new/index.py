import random
countries = open("countries.txt", "r")
data = []
display = []

for country in countries.readlines():
	data.append(country.strip().lower())

random_countries = random.choice(data)
# random_countries = "El Salvador"
print(random_countries)

if "{" in random_countries:
	random_countries = random_countries.split("{")[0].strip().rstrip(",") # removes any countries that has {} in them

for char in random_countries:
	if char in [" ", "-"]:
		display.append(char)
	else:
		display.append("_")

print(" ".join(display))



