const response = await fetch("https://api.paystack.co/bank", {
	method: "POST",
	headers: {
		Accept: "*/*",
		"content-type": "application/json",
	},
	body: JSON.stringify({
		username: "Nicholas",
		email: "nick@gmail.com",
	}),

	// body: `{
	// 	username: "Nicholas",
	// 	email: "nick@gmail.com",
	// }`,
});
