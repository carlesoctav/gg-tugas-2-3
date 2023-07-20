

const { response } = require('express')
const Playlist = require('../models/playlist')
const song = require('../models/song')


async function create_save_construct_test() {

    const playlist = new Playlist("Kobo tapi jepang")
    const ids = await Playlist.getAllId()
    console.log(ids)
    playlist.songlistId.push('u5v3ey959j10kevz6cug5c')
    await playlist.construct()

    console.log(playlist.constructedSonglist)
}

async function get_update_delete(){
    const playlist = await Playlist.getPlaylistbyId('ki6hyn9bizfrskrrpf384o')
    playlist.songlistId.push('q9k2l0oaxeajlrc77u4rc9')
    await playlist.construct()
    console.log(playlist.constructedSonglist)
    await playlist.save()

    // playlist.delete()

}

// create_save_construct_test()
// get_update_delete();