let year = 2100

if (year % 100 === 0)
	if (year % 400 === 0) return "29 days"
	else return "28 days"
else
	if (year % 4 === 0) return "29 days"
	else return "28 days"

// console.log(leap_year(2000))