const compVision = require('@azure/cognitiveservices-computervision').ComputerVisionClient
const apiKeyCreds = require('@azure/ms-rest-js').ApiKeyCredentials
const dotenv = require('dotenv')
dotenv.config()
const util = require('util');
const readFile = util.promisify(require('fs').readFile);
//authenticate
const vision_apikey=process.env.VISION_APIKEY, vision_endpoint = process.env.VISION_ENDPOINT
//create client
const compVisionClient = new compVision(new apiKeyCreds({
    inHeader:{ 'Ocp-Apim-Subscription-Key': vision_apikey }
}),vision_endpoint)

const readDoc = async (req,res) => {
  try {
    //the document reading API Function
 
    console.log('Fetching file & reading into it...\n')
    let fileURL = './docs/invitation-letter.jpg' //.pdf,.png,.jpg
    //recognize text
    let readResult = await readText(compVisionClient,fileURL)
    //print text
    res.status(200).json({content:printText(readResult)})
  } catch (error) {
    console.log(error)
  }
}

    //recognize text function
    const readText = async (client,filePath) =>{
      // Read the file as a Buffer
      const fileBuffer = await readFile(filePath);
      // read text from the Buffer
      let result = await client.readInStream(fileBuffer);
      // Operation ID is last path segment of operationLocation (a URL)
      let operation = result.operationLocation.split('/').slice(-1)[0];
      // check the status and wait if needed
      while (result.status !== "succeeded") {result = await client.getReadResult(operation)}
        return result.analyzeResult.readResults;
    }

  //display the identified text
  const printText= (results) =>{
    let collection='';
    for (const page in results) {
        if (results.length > 1) {
          collection += (`Page: ${page}`);
        }
        let result = results[page];
        if (result.lines.length) {
        for (const line of result.lines) {
            collection += (line.words.map(w => w.text).join(' '))+" ";
        }
        }
        else { collection = 'No recognized text.'; }
    }

    return collection
  }


module.exports = readDoc