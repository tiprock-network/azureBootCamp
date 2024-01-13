const dotenv = require('dotenv')
dotenv.config()
const sdk = require('microsoft-cognitiveservices-speech-sdk')
const request = require('request')
const audio_file='./public/synthesized/speechoutput.wav'

const getAudioResponse= async (req,res) =>{
    
    let lang = req.query.lang
    let dialect = req.query.dialect
    let voicewav = req.query.voicewav
    //make language default value
    if(!lang) lang='en-US'
    if(!dialect) dialect='en-US'
    //default voice data
    if(!voicewav) voicewav='fastfoodNairobi';
     
     const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.API_KEY_SPEECH, process.env.API_SPEECH_REGION)
     const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audio_file)

     //voice in preferred dialect
     speechConfig.speechSynthesisVoiceName= `${dialect}`
     const synthesizer = new sdk.SpeechSynthesizer(speechConfig,audioConfig)

    request(`http://localhost:5001/api/completetext?voicewav=${voicewav}&lang=${lang}`,async (error,response,body)=>{
        const prompt=JSON.parse(body).response
        //start synthesizer and await results
        synthesizer.speakTextAsync(`${prompt}`,(result)=>{
            if(result.reason == sdk.ResultReason.SynthesizingAudioCompleted) res.status(200).json({message:'Synthesis finished successfully'});
            else res.status(400).json({message:{Error:result.errorDetails}})

            synthesizer.close()
            synthesizer = null
        })
        console.log("Now synthesizing to: " + audio_file)
    })
}

module.exports = getAudioResponse