const fs = require("fs");

const getBalance = () => {
	try {
		const result = fs.readFileSync("accountBalance.txt", "utf8");
		return Number(result);
	} catch (err) {
		return 0;
	}
};

const saveBalance = (balance) => {
	try {
		fs.writeFileSync("accountBalance.txt", String(balance), "utf8");
	} catch (err) {
		console.error("Error writing file ", err);
	}
};

module.exports = {
	getBalance,
	saveBalance,
};
