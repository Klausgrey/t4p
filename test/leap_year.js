const leapYear = (num) => {
	let leap = false;

	if (isNaN(num)) {
		console.log("please enter a valid year");
		return false
	}

	if (num % 400 === 0) leap = true
	else if (num % 100 === 0) return false
	else if (num % 4 === 0) leap = true
	else leap = false

	return leap;
};

console.log(leapYear(2000));
