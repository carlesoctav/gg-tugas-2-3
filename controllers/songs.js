const Song = require('../models/song')
const SongRouter = require('express').Router()
const sortedByPlayCount = require('../services/sortedByPlayCount')







// CREATE
SongRouter.post('/', async (req, res) => {
    try {
        const song = new Song(req.body)
        await song.save()
        res.status(201).json(song)
    } catch (error) {
        res.status(400).send(error)
    }
})

// READ ALL
SongRouter.get('/', async (req, res) => {

    try {
        const songs = await Song.getAllId()
    } catch (error) {
        res.status(500).send(error)
    }


    if(!body.sorted){
        res.send(sortedByPlayCount(songs))
    } else{
        res.send(songs)
    }
})

// READ ONE and COUNT it as played
SongRouter.get('/:id', async (req, res) => {
    try {
        const song = await Song.getSongbyId(req.params.id)
        if (!song) {
            return res.status(404).send()
        }
        
        await updatePlayCount(song)
        res.send(song)
    } catch (error) {
        res.status(500).send(error)
    }
})

// UPDATE
SongRouter.put('/:id', async (req, res) => {

    const body = req.body()
    
    try {
        const song = await Song.getSongbyId(req.params.id)
        if (!song) {
            return res.status(404).send()
        } catch(error){
            next(error)
        }
    }

    song.title = body.title === undefined ? song.title : body.title
    song.artist = body.artist === undefined ? song.artist : body.artist
    song.url = body.url === undefined ? song.url : body.url

    try {
        await song.save()
        res.send(song)
    } catch (error) {
        next(error)
    }
}
// DELETE
SongRouter.delete('/:id', async (req, res) => {
    try {
        const song = await Song.getSongbyId(req.params.id)
        if (!song) {
            return res.status(404).send()
        }
    } catch(error){
        next(error)
    }

    try {
        await song.delete()
        res.send(song)
    } catch (error) {
        next(error)
    }
})

module.exports = SongRouter
