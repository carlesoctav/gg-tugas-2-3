const Song = require("./song");
class Playlist {
    constructor(playlistName, songlistId, id){


        const tempId = id === undefined ? Playlist.generateID() : id
        this.playlistName = playlistName
        this.songlistId =  songlistId === undefined ? [] : songlistId
        this.constructedSonglist = []
        Object.defineProperty(this, 'id', { value: tempId, writable:false})
    }

    static generateID(){
        const id  = Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15)
        return id
    }

    static async getAllId(){

        try{
            const response = await fetch('http://localhost:3000/playlists')
            const data = await response.json()
            const ids = data.map(playlist => playlist.id)
            return ids
        } catch(error){
            console.error(error)
        }
    }

    static async getPlaylistbyId(id){
        try{
            const response = await fetch(`http://localhost:3000/Playlists/${id}`, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            
            return new Playlist(data.playlistName, data.songlistId, data.id)
        } catch(error){
            console.log(error)
        }
    }

    async construct(){
        try{
            const promises = this.songlistId.map(async element => {
                const song = await Song.getSongbyId(element)
                if(song.title !== undefined){
                  this.constructedSonglist.push(song)
                }
            })
            await Promise.all(promises)

        } catch(error){
            console.log(error)
        }
    }

    async update(playlistEdited){
        try{
             const response = await fetch(`http://localhost:3000/playlists/${this.id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playlistEdited)
            })
            return response

        } catch(error){
            console.log(error)
        }
    }

    async firstSave(playlistEdited){
        try{
            const response = await fetch(`http://localhost:3000/playlists/`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playlistEdited)
            })

        } catch(error){
            console.log(error)
        }
    }

    async save(){
        const ids = await Playlist.getAllId()

        const playlistEdited = {
            'playlistName': this.playlistName,
            'songlistId': this.songlistId,
            'id': this.id
        }

        if(ids.some(id => id === this.id)){
            try{
                await this.update(playlistEdited)
            }catch(error){
                console.log(error)
            }
        } else{
            try{
                await this.firstSave(playlistEdited)
            } catch(error) {
                console.log(error)
            }
        }
    }

    async delete () {
        try {
        const response = await fetch(`http://localhost:3000/playlists/${this.id}`, {
            method: 'DELETE'
        })
        return (response)
        
        } catch(error){
        console.log(error)
        }

    }
}


module.exports = Playlist