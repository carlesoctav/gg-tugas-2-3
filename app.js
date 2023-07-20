const express = require('express')
const app = express()
const PORT = 3001
const SongRouter = require('./controllers/songs')

app.use(express.json())

app.use('/songs', SongRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
