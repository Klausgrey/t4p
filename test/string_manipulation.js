const manipulation = (string, commands) => {
	if (string.length < 20)
		return console.log("Please enter a sentence longer than 20 words");
	if (commands.length < 1) return console.log("You entered an empty command");

	let back = [];
	let arr = string;

	for (let command of commands) {
		command = command.toLowerCase()
		if (command === "u") {
			arr = arr.toUpperCase();
		} else if (command === "l") {
			arr = arr.toLowerCase();
		} else if (command === "r") {
			arr = arr.split("").reverse().join("");
		} else if (command === "z") {
			back.pop();
			arr = back[back.length - 1];
			continue
		} else if (command.includes("c ")) {
			to_lower = arr.toLowerCase();
			const [, second, thrid] = command.split(" ");
			arr = to_lower.replaceAll(second, thrid);
		} else {
			return console.log("Please enter a valid command");
		}
		back.push(arr);
	}

	return console.log(arr);
};

manipulation("Edosa is a boy", ["u", "l", "z", "c b z", "r", "Z"]);
