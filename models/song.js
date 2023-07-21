class Song {
    constructor(artist, title, url, playCount, id){

        const tempId = id === undefined ? Song.generateID(): id
        const tempPlayCount = playCount === undefined ? Song.generatePlayCount() : playCount

        this.artist = artist
        this.title = title
        this.url = url
        this.playCount = tempPlayCount
        Object.defineProperty(this, 'id', { value: tempId, writable: false })
    }

    static generateID(){
        const id  = Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15)
        return id
    }

    static generatePlayCount(){
        return Math.floor(Math.random()*100000000)
    }

    static async getAllId(){

        try{
            const response = await fetch('http://localhost:3000/songs')
            const data = await response.json()
            const ids = data.map(song => song.id)
            return ids
        } catch(error){
            console.log(error)
        }
    }

    static async getAll(){
        try{
            const response = await fetch('http://localhost:3000/songs')
            const data = await response.json()
            const songs = data.map(song => new Song(song.artist, song.title, song.url, song.playCount, song.id))
            return songs
        } catch(error){
            console.error(error)

        }
    }

    static async getSongbyId(id){
        try{
            const response = await fetch(`http://localhost:3000/songs/${id}`, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            
            return new Song(data.artist, data.title, data.url, data.playCount, data.id)
        } catch(error){
            console.log(error)
        }
    }

    static Validate(song){

        const artist = song.artist
        const title = song.title
        const url = song.url

        if(!Array.isArray(artist)){
            console.log("we are here")
            throw new Error('Artist must be an array')
        }

        if(artist.length === 0){
            throw new Error('Artist cannot be empty')
        }

        if(!artist.every((item) => typeof item === 'string')){
            throw new Error('Artist must be an array of strings')
        }

        if(typeof title !== 'string'){
            throw new Error('Title must be a string')
        }

        if(title.length === 0){
            throw new Error('Title cannot be empty')
        }

        if(typeof url !== 'string'){
            throw new Error('URL must be a string')
        }

        if(url.length === 0){
            throw new Error('URL cannot be empty')
        }

        if(!url.startsWith('https://')){
            throw new Error('URL must be a valid YouTube URL')
        }
    }

    async update(songEdited){
        try{
             const response = await fetch(`http://localhost:3000/songs/${this.id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(songEdited)
            })
            return response

        } catch(error){
            console.log(error)
        }
    }

    async firstSave(songEdited){
        try{
            const response = await fetch(`http://localhost:3000/songs/`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(songEdited)
            })

            return response

        } catch(error){
            console.log(error)
        }
    }

    async save(){
        

        const songEdited = {
            'title': this.title,
            'artist': this.artist,
            'url': this.url,
            'playCount': this.playCount,
            'id': this.id
        }

        Song.Validate(songEdited)

        const ids = await Song.getAllId()

        if(ids.some(id => id === this.id)){
            try{
                await this.update(songEdited)
            }catch(error){
                console.log(error)
            }
        } else{
            try{
                await this.firstSave(songEdited)
            } catch(error) {
                console.log(error)
            }
        }
    }

    async delete () {

        try {
        const response = await fetch(`http://localhost:3000/songs/${this.id}`, {
            method: 'DELETE'
        })

        return (response)
        
    } catch(error){
        console.log(error)
    }

    }

    playCountPlusPlus(song){
        this.playCount++
    }
}

module.exports =  Song