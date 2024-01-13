const express = require('express')
const dotenv = require('dotenv')
dotenv.config()


const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))
app.use('/api',require('./routes/speechRoute'))
  

const PORT=process.env.PORT || 5005
app.listen(PORT,()=>console.log(`Service running on port - ${PORT}...`))








