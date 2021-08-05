
require('dotenv').config({ path: './config.env' })
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helemt = require('helmet')
const rateLimit = require('express-rate-limit')
const fs = require('fs')
const compression = require('compression')
const { connectDB } = require('./config/db')
const bodyParser = require('body-parser')

const NodeCache = require('node-cache')

module.exports.myCache = new NodeCache({
  stdTTL: 3600,
})

connectDB()

if (!fs.existsSync('./tempFiles')) {
  fs.mkdirSync('./tempFiles')
}

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(
  bodyParser.json({
    limit: '5mb',
  })
)
// app.use(express.json())
app.use(cors())
app.use(helemt())
app.use(compression())

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
})
app.use(limiter)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'))
}

app.use('/api/v1/auth', require('./routes/userRoutes'))

const PORT = process.env.PORT || 8000


// app.use(express.static(path.join(__dirname, 'public/uploads')))

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
