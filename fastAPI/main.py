from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from deepface import DeepFace  
from PIL import Image 
import os
import tensorflow as tf
import io
import numpy as np

# Suppress TensorFlow warnings and oneDNN messages
# os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
tf.get_logger().setLevel('ERROR')

app = FastAPI()

@app.post("/detect-emotion")
async def detect_emotion(file: UploadFile=File(...)):
    try:
        if not file or not file.filename:
            return JSONResponse(content={"error": "No file uploaded"}, status_code=400)
        
        # Read uploaded file as bytes
        file_bytes = await file.read()
        if not file_bytes:
            return JSONResponse(content={"error": "Empty file uploaded"}, status_code=400)
        
        # Load the image
        image = Image.open(io.BytesIO(file_bytes))
        # temp_image_path = "tak.jpg"  # Save it temporarily in the current directory
        # image.save(temp_image_path)
        
        # Perform emotion analysis
        analysis = DeepFace.analyze(img_path=np.array(image), actions=["emotion"])
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
        emotions = {str(k): str(v) for k, v in emotions.items()}
        return JSONResponse(content={
            "emotions":emotions,
            "dominant_emotion": dominant_emotion
        })
    except Exception as e:
        print(f"Error: {str(e)}")
        return JSONResponse(content={"error": str(e)}, status_code=400)
