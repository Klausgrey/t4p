const res = await fetch("http://localhost:3000/posts");
const data = await res.json();
console.log(data);
