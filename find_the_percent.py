student_marks = dict(alpha = [20,30,40], beta = [30,50,70])
query_name = "beta"
total = 0

value = student_marks[query_name]

average = (sum(value) / len(value))
print(f"{average:2f}")
