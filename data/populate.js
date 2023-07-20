const Song = require('../models/song')

const fs = require('fs');

fs.readFile('./data/kobo.json', 'utf8', async (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const jsonData = JSON.parse(data);

    for (let i = 0; i < jsonData.length; i++) {
        const item = jsonData[i];

        const song = await  new Song(["Kobo Kanaeru"], item.title, item.url)
        song.save()
    }
});