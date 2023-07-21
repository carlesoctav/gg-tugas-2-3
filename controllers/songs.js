const Song = require('../models/song')
const songRouter = require('express').Router()
const sortedByPlayCount = require('../services/sortedByPlayCount')
// const playCountPlusPlus = require('../services/playCountPlusPlus')


//CREATE
songRouter.post('/', async (req, res) => {
    try {
        const title = req.body.title
        const artist = req.body.artist
        const url  = req.body.url
        const playCount = 0
        const song = new Song(artist,title,url,playCount)
        await song.save()
        res.status(201).json(song)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

// READ ALL
songRouter.get('/', async (req, res) => {
    const body = req.body
    try {
        const songs = await Song.getAll()
        if(!body.sorted){
             return res.send(songs)
        } else{
            return res.send(sortedByPlayCount(songs))
        }

    } catch (error) {
        res.status(500).send(error)
    }
})

songRouter.get('/:id', async (req, res) => {
    try {
        const song = await Song.getSongbyId(req.params.id)
        if (!song.title) {
            return res.status(404).send({error: 'Song not found'})
        }
        song.playCountPlusPlus()
        res.send(song)
        await song.save()
    } catch (error) {
        return res.send({error:error.message})
    }
})

songRouter.put('/:id', async (req, res) => {

    const body = req.body
    
    try {
        const song = await Song.getSongbyId(req.params.id)
        if (!song.title){
            return res.status(404).send({error: 'Song not found'})
        } 

        song.title = body.title === undefined ? song.title : body.title
        song.artist = body.artist === undefined ? song.artist : body.artist
        song.url = body.url === undefined ? song.url : body.url

        await song.save()
        res.send(song)
        
    } catch(error){
        return res.send({error:error.message})
    }

})

songRouter.delete('/:id', async (req, res) => {
    try {
        const song = await Song.getSongbyId(req.params.id)
        if (!song.title) {
            return res.status(404).send({error: 'Song not found'})
        }
        await song.delete()
        return res.send({message: 'Song deleted', song})
    } catch (error) {
        return res.send({error:error.message})
    }
})


module.exports = songRouter
