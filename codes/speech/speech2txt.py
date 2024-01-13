import os
import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv
load_dotenv()

def recognize_speech():
    # This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION" in that respect
    
    speech_config = speechsdk.SpeechConfig(subscription=os.environ.get('SPEECH_KEY'), region=os.environ.get('SPEECH_REGION'))
    speech_config.speech_recognition_language="en-KE" #this is put in en-KE because we are in Kenya
    audio_config = speechsdk.AudioConfig(filename="./voices/fastfoodNairobi.wav")
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)
    
    result = speech_recognizer.recognize_once_async().get()
    return result


print(recognize_speech().text)