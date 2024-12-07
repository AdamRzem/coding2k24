from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from deepface import DeepFace  
from PIL import Image 
import tensorflow as tf
import cv2 as cv
import numpy as np
import requests
from io import BytesIO

# Load the image
print("hello")
# respose = requests.get("http://192.168.137.220/", stream=True, timeout=10)
cap = cv.VideoCapture("http://192.168.137.59:4747/video")
ret, image = cap.read()
print(ret)
print(image)

# temp_image_path = "tak.jpg"  # Save it temporarily in the current directory
# image.save(temp_image_path)

# Perform emotion analysis
analysis = DeepFace.analyze(img_path=image, actions=["emotion"])
analysis = analysis[0]
# Extract emotions and dominant emotion
emotions:dict[np.float32] = analysis["emotion"]
dominant_emotion = analysis["dominant_emotion"]

# Log the information to the console
print("Emotions:", emotions)
print("Dominant Emotion:", dominant_emotion)
print(type(emotions))
print(type(dominant_emotion))
# Remove the temporary image file
# os.remove(temp_image_path)
emotions = {str(k): float(v) for k, v in emotions.items()}

requests.post("http://localhost:5173/cam", json={**emotions, "dominant_emotion": dominant_emotion})
#requests
# return JSONResponse(content={
#     "emotions":emotions,
#     "dominant_emotion": dominant_emotion
# })
# pt Exception as e:
# print(f"Error: {str(e)}")
# return JSONResponse(content={"error": str(e)}, status_code=400)