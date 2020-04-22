const express = require('express')
const apiRoute = require('./api')
const cookieParser = require('cookie-parser')

const server = express()
const port = process.env.PORT || 5000

server.use(cookieParser())
server.use('/api', apiRoute)

server.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
})

