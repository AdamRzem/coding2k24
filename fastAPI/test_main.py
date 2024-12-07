
import requests

# URL of the FastAPI endpoint
url = "http://127.0.0.1:8000/detect-emotion/"

# Path to the image file you want to test
file_path = "fastAPI/tak.jpg"

# Open the file in binary mode
with open(file_path, "rb") as file:
    # Send a POST request with the file
    response = requests.post(url, files={"file": file})

# Print the response from the server
print(response.json())