create table notes (
	id int AUTO_INCREMENT primary key,
	name varchar(277),
	lastname varchar(277)
	faculty varchar(25),
	department varchar(25) constraint dpt check(department in ("science", "education", "art")),
	age int constraint minimum_age check(age >= 16)
)

describe notes