import requests
from bs4 import BeautifulSoup

url = "http://books.toscrape.com"
response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

books = soup.find_all("article", class_="product_pod")

# print(len(books))
for book in books:
	title = book.find("h3").find("a")["title"]
	price = book.find("p", class_="price_color").text
	rating = book.find("p", class_="star-rating")["class"][1]

	print(f"{title} | {price} | {rating}")