students = [["Harry", 37.21],["Berry", 37.21],["Tina", 37.2],["Akriti", 41],["Harse", 39]]


score = [x[1] for x in students]
second_lowest = sorted(set(score))[1]

result = [x[0] for x in students if x[1] == second_lowest]
result.sort()
print(result)