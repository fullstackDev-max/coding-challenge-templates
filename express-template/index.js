const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./routes/index.routes')

dotenv.config()

const app = new express()

// set body parse
app.use(bodyParser.json())

// set cors
app.use(cors())

app.use('/api', router)

app.listen(8080, () => {
    console.log('Listening on 8080. Ctrl+c to stop this server.')
})
