const dotenv = require('dotenv')
dotenv.config()
const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const getSpeechText = async () =>{
    
    // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
    try{
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.API_KEY_SPEECH, process.env.API_SPEECH_REGION);
    speechConfig.speechRecognitionLanguage = `en-US`;
    
    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(`./speech_files/arabic_greeting.wav`));
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    const result = await new Promise((resolve, reject) => {speechRecognizer.recognizeOnceAsync(resolve, reject);});
    if(result.reason == sdk.ResultReason.RecognizedSpeech) console.log(`${result.text}`);  
    else if(result.reason !== sdk.ResultReason.RecognizedSpeech) console.log(`Sorry but couldn't get what you said.`);
    speechRecognizer.close();  
    }
    catch (error) {console.log(error)}
}
getSpeechText()