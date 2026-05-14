def angry_professor(a, k):
    count = 0

    for num in a:
        if num <= 0:
            count += 1

    return "YES" if count < k else "NO"


user = input("Enter n and k...numbers: ")
user_split = [int(y) for y in user.split(" ")]

user1 = input("Enter the number of people that came: ")
user1_split = [int(x) for x in user1.split(" ")]

if len(user1_split) != user_split[0]:
    print("missmatch")
else:
    print(angry_professor(user1_split, user_split[1]))
# print(angry_professor(3, [-2, 1, 0, 1, 2]))
