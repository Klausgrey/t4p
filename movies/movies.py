import requests
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("tmdb_api_key")

url = f"https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language=en-US&page=1"

response = requests.get(url)
data = response.json()

print(data["results"][0])