const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const cors = require('cors')

const PORT = process.env.PORT || 8080
const app = express()

//STATIC FOLDER
app.use(express.static(path.join(__dirname, '../client/build')))

// Body Parser Middleware
app.use(bodyParser.json())

// Deal with CORS
app.use(cors())

// Start Express listening
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

// Test to make sure the API can talk to React
app.get('/', (_req, res) => {
  return res.json({
    message: 'API Active'
  })
})

// An echo, to help with debugging
app.post('/', (req, res) => {
  return res.json({
    message: 'ECHO!',
    posted: req.body
  })
})

require("./routes/contact-us.routes")(app)