while True:
    userInput1 = input(
        "Please enter a sentence longer that is longer than 20 characters: "
    )
    if len(userInput1) <= 20:
        print("Edosa, enter a sentence longer than 20 characters")
        continue
    else:
        break


change = userInput1
save = []
while True:
    print(
        "U for uppercase, L for lowercase, R for Reversing the string, Z for undoing, C for replacing, and X to terminate"
    )
    userInput2 = input("$: ")

    if userInput2 == "u":
        change = change.upper()
        save.append(change)
    elif userInput2 == "l":
        change = change.lower()
        save.append(change)
    elif userInput2 == "r":
        change = change[::-1]
        save.append(change)
    elif userInput2.startswith("c"):
        splitInput = userInput2.split(" ")
        x = splitInput[1]
        y = splitInput[2]
        change = change.replace(x, y)
        save.append(change)
        print(f"{change}")
    elif userInput2 == "z":
        save.pop()
        change = save[-1]
        print(change)
    elif userInput2 == "x":
        print(f"{change}")
        break
    else:
        print("Invalid response, try again with the commands above")
        continue
