// const PATTERN = /^b(a|e|i|o|u)t/i;
const PATTERN = /^[a-z]+[0-9]*@[a-z]+(\.[a-z]{3})+$/i;

// const values = ["bet", "butter", "alphabet", "bat", "batter"];
const values = [
	"nick@gmail.com",
	"nick210@gmail.com",
	"nick.gmail.com",
	"nick@yahoo.com.org",
	"nick@gmail,com",
	"@nick-gmail-com",
];

values.forEach((value, index) => {
	const match = PATTERN.test(value);
	console.log({ index, match, length: value.length });
});
