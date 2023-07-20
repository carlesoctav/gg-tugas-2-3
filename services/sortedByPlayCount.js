const sortedByPlayCount = (songs) => {
    return songs.sort((a, b) => {
        return b.playCount - a.playCount
    })
}

module.exports = sortedByPlayCount