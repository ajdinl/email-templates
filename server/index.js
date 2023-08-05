const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 4200
const { errorHandler } = require('./middleware/errorHandler')
const templates = require('./routes/templateRoutes')
const users = require('./routes/userRoutes')
const cors = require('cors')

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/templates', templates)
app.use('/api/users', users)

app.use(errorHandler)

app.use((req, res) => {
  res.status(404).send('Not Found')
})

app.listen(port, () => {
  console.log('Server is running on port 4200')
})
