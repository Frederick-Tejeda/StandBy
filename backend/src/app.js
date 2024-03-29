const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
require('dotenv').config()
const { SignToken, VerifyTokens } = require('./controller/cryptControllers')

// Settings

app.set('PORT', process.env.PORT)

// Middlewares

app.use(cors())
app.use(express.json())
app.use(helmet())

//Routes

app.get('/', (req, res) => res.send("What's up!"))
app.use('/crypt', require('./routes/crypt'))
app.use('/users', require('./routes/users'))


module.exports = app;
