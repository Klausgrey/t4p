// check the lenght of the phone number
//bonus trim out spaces
// check wheather it starts from 0 => 11 or 234 => 13 or +234 => 14
// or if it starts with any of the above just remove it and add 0 to the front.
// after the 0 the next digit must be either 7 or 8 or 9
// and after that the next number should be 0 or 1
// 8122168624
// \b(0|\+?234)[7-9][0-1][0-9]{8}\b
const details = [
	"My name is Edosa, my 49815671345 number is 080123456789 2348012345678 ++2348012345678",
	"07045671345 09012345678 09312345678 8134312272 01242345678 is the 45671345 phone number",
];



const isValidNumber = (phoneNumber) => {
	const cleanNumber = phoneNumber.split(" ").join("");
	let number = "";

	if (cleanNumber.startsWith("+234")) number = "0" + cleanNumber.slice(4);
	else if (cleanNumber.startsWith("234")) number = "0" + cleanNumber.slice(3);
	else if (cleanNumber.startsWith("0")) number = cleanNumber;
	else if (cleanNumber.startsWith("8") || cleanNumber.startsWith("7"))
		number = "0" + cleanNumber;
	else return false;

	for (let i = 0; i < number.length; i++) {
		if (number[i] < "0" || number[i] > "9") {
			return false;
		}
	}

	if (number.length !== 11) return false;
	if (isNaN(number)) return false;
	if (number[1] !== "7" && number[1] !== "8" && number[1] !== "9") return false;
	if (number[2] !== "0" && number[2] !== "1") return false;

	return true;
};
// const result = isValidNumber("7122168624");
// console.log(result);


let texts = []
for (let char of details) {
	texts = char.split(" ")
	for (let text of texts) {
		let isValid = isValidNumber(text)
		if (isValid) {
			console.log(isValidNumber(text), text);
		}

	}
}
