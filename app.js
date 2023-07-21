const express = require('express')
const app = express()
const PORT = 3001
const SongRouter = require('./controllers/songs')
const middleware = require('./utils/middleware')

app.use(express.json())
app.use(middleware.requestLogger)


app.use('/songs', SongRouter)

app.use(middleware.unknownEndpoint)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
