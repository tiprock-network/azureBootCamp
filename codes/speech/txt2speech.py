import os
import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv
load_dotenv()

def text2speech():
    # This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    speech_config = speechsdk.SpeechConfig(subscription=os.environ.get('SPEECH_KEY'), region=os.environ.get('SPEECH_REGION'))
    
    # The language of the voice that speaks.
    speech_config.speech_synthesis_voice_name = 'en-KE-AsiliaNeural'

    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)

    # Get text from the console and synthesize to a WAV file.
    print("Kenya has a variety of foods such as Nyama Choma, Chapati, and Ugali.")
    text = input()

    # Create an audio data stream to store the synthesized audio
    audio_data_stream = speechsdk.audio.AudioDataStream(format=speechsdk.audio.AudioStreamFormat(pcm_format=speechsdk.audio.PcmFormat.Pcm16kHz))
    
    # Start synthesizing text to the audio data stream
    speech_synthesizer.start_speaking_text(text, audio_data_stream)

    # Wait for synthesis to complete
    speech_synthesizer.wait_for_synthesis_completion()

    # Save the audio data stream to a WAV file
    audio_file_path = "synthesized_audio.wav"
    with open(audio_file_path, "wb") as audio_file:
        audio_data_stream.save_to_wav_file(audio_file)

    print("Speech synthesized for text [{}]".format(text))
    print("Audio saved to {}".format(audio_file_path))

text2speech()
