 
const Song = require('../models/song')

//STATIC METHOD
// console.log(Song.generateID()) //V
// console.log(Song.generatePlayCount()) //V

// V save biasa
// const songKobo = new Song(["kobo kanaeru"], "kobosaurus", "www.youtube.com")
// console.log(songKobo) 
// songKobo.save()

// ambil playlist by id, terus edit V
Song.getSongbyId('1')
.then(song =>{
    console.log(song)
    console.log(song.id)
    console.log(song.playCount)
    song.artist = "kylei"
    song.title = "bukan kobo saurus 1000"
    song.id = 'lafj;lksjfasjfd'

    song.delete()
    .then(res=> console.log(res
        ))
})


