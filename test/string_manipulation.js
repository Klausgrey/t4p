const manipulaltion = (string, commands) => {
	if (string.length < 20)
		return console.log("Please enter a sentence longer than 20 words");
	if (commands.length < 1) return console.log("You entered an empty command");

	let back = [];
	let arr = string;

	for (let x of commands) {
		if (x === "u") {
			arr = arr.toUpperCase();
			back.push(arr);
		} else if (x === "l") {
			arr = arr.toLowerCase();
			back.push(arr);
		} else if (x === "r") {
			arr = arr.split("").reverse().join("");
			back.push(arr);
		} else if (x === "z") {
			back.pop();
			arr = back[back.length - 1];
		} else if (x.includes("c ")) {
			const [first, second, thrid] = x.split(" ");
			arr = arr.replaceAll(second, thrid);
			back.push(arr);
		} else {
			console.log("Enter another command");
		}
	}

	return console.log(arr);
};

manipulaltion("Edosa is a boy", []);
