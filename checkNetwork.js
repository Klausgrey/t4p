function checkNetwork(phoneNumber) {
	let cleanNumber = phoneNumber;
	let networkNumber = cleanNumber.slice(0, 4);

	const networks = {
		MTN: [
			"0803",
			"0806",
			"0810",
			"0813",
			"0814",
			"0816",
			"0903",
			"0906",
			"0913",
			"0916",
			"0703",
			"0706",
		],
		Airtel: [
			"0802",
			"0808",
			"0812",
			"0901",
			"0902",
			"0904",
			"0907",
			"0912",
			"0701",
			"0708",
		],
		Glo: ["0805", "0807", "0811", "0815", "0905", "0915", "0705"],
		"9mobile": ["0809", "0817", "0818", "0908", "0909"],
	};

	for (const [network, firstFourNumber] of Object.entries(networks)) {
		if (firstFourNumber.includes(networkNumber)) return network;
	}
	return "unknown number";
}

module.exports = checkNetwork;
