const res = await fetch("https://api.paystack.co/bank");
const data = await res.json();
console.log(data);
