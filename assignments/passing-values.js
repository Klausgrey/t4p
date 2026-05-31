/**
 * So the core idea is that when you call a function and pass something to it, there are two ways that "passing" can work
 *
 * 1. Passing by Value(Primitive)
 * the function gets its own copy of the data. Whatever it does with that copy doesn't affect the original.
 *
 * 2. Passing by Reference (Object/Arrays)
 * When you pass an object, JavaScript passes a reference to that object in memory. Modifying a property changes the original.
 */


// Pass by Value
const modifyValue = (num) => {
	num = 100; // modifies the local copy
	console.log(num); // output: 100
};
let score = 45;
modifyValue(score);
console.log(score); // output: 45


// Pass by Reference
function updateAge(person) {
	person.age = 25
	console.log(person.age);
}

const user = {
	name: "Nic",
	age: 0
}

user.age = 10
console.log(user.age); // output: 10 — the change happened
updateAge(user)
console.log(user.age); // outputs: 25 — function overwrote it