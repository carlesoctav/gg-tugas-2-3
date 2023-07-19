class Song {
    constructor(artist, title, url, playCount, id){

        const tempId = id === undefined ? Song.generateID(): id
        const tempPlayCount = playCount === undefined ? Song.generatePlayCount() : playCount

        this.artist = artist
        this.title = title
        this.url = url
        Object.defineProperty(this, 'playCount', { value: tempPlayCount, writable:false})
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

    async update(songEdited){
        try{
             const response = await fetch(`http://localhost:3000/songs/${this.id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(songEdited)
            })
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
        } catch(error){
            console.log(error)
        }
    }



    async save(){
        const ids = await Song.getAllId()

        const songEdited = {
            'title': this.title,
            'artist': this.artist,
            'url': this.url,
            'playCount': this.playCount,
            'id': this.id
        }

        

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

}

module.exports =  Song