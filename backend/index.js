const express = require('express')
const server = require('express')()
const morgan = require('morgan')
const cors = require('cors')

const connectDB = require('./config/db')
const PORT = process.env.PORT || 5050

server.use(express.json())
server.use(cors())
server.use(morgan('tiny'))

connectDB()

//endpoints
server.use('/api/login', require('./routes/login'))
server.use('/api/register', require('./routes/register'))
server.use('/api/post', require('./routes/post'))
server.use('/api/comment', require('./routes/comment'))
server.use('/api/user', require('./routes/user'))

server.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`))
