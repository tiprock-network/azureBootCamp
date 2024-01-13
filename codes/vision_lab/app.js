const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

app.use('/api/v1/readfile',require('./routes/readDocRoute'))

const PORT = process.env.PORT || 5001
app.listen(PORT, ()=> console.log(`App listening on port ${PORT}...`))
