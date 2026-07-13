function reverseArray(a) {
	let nerArr = new Array() || [];

	for (let i = a.length - 1; i >= 0; i--) {
		nerArr.push(a[i]);
	}
	return nerArr;
}

console.log(reverseArray([1, 2, 3, 4]));
