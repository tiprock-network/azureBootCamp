const {OpenAIClient,AzureKeyCredential} = require('@azure/openai')
const request = require('request')
require('dotenv').config()
const openai_key=process.env.AZOPENAI_KEY
const openai_endpoint=process.env.AZOPENAI_ENDPOINT

const responseDoc = async (req,res) => {
  try {
        let body = await getRequest('http://localhost:5000/api/v1/readfile/single');
        let text = `Summarize the following text: ${(JSON.stringify(body.content))}
                    Summary:
                  `
        const prompt = [text];
        console.log(text)
        const client = new OpenAIClient(openai_endpoint, new AzureKeyCredential(openai_key));
        const deploymentName = "infopackDeployment";
        const {choices} = await client.getCompletions(deploymentName, prompt,{maxTokens:48});

       
        res.json({ response: choices[0].text.split('\n')[0] });
        
  } catch (err) {
    console.error('Unhandled Promise Rejection:', err);
    res.status(500).json({ Error: 'Internal Server Error' });
  }
}

// Promisify the request function
// Promisify the request function with JSON parsing
const getRequest = async (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        try {
          const jsonResponse = JSON.parse(body);
          resolve(jsonResponse);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
};

module.exports = responseDoc