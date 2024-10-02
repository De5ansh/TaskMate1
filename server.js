const express =  require('express')
const { OpenAI } = require("openai")
const app = express()

app.use(express.static('public'))

app.listen(5000, ()=> {
    console.log("Server is active")
})
const openai = new OpenAI({
    // replace your-api-key with your API key from ChatGPT
    apiKey: 'sk-CIr9H1Bh2k3gRb5H2c_mYebG2btQobY0yHHK-frfRpT3BlbkFJuhtFS2qDG1pU3znGAULT8Zb5i97BOw8im5_BPAHDAA'
})
app.post('/chat', async (req, res)=> {   
    try {
      const resp = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: req.body.question}
          ]  
      })           
  
      res.status(200).json({message: resp.choices[0].message.content})
    } catch(e) {
        res.status(400).json({message: e.message})
    }
})