# Tugas gigih 2-3

## 1. Deskripsi Tugas

Create an HTTP Server to store your playlist
1. Add song to your playlist
Attributes: Title, Artists (can have multiple artist), URL (from spotify URL)
2. Play song from your playlist
3. Get List of songs from your playlist

Continuing previous session homework with this additional rule:
1. Make playlist as a model
2. Track song play count in the playlist
3. Add feature to Get list of songs to be sorted by most played

## 2. Cara Menjalankan
*Node yang diguakan adalah node versi 20.4*

sebelum menjalankan aplikasi, pastikan sudah menginstall library yang dibutuhkan dengan cara menjalankan perintah berikut di terminal:

```bash
npm install
```

untuk menjalankan aplikasi, kita membutuhkan sebuah server database, gunakan perintah berikut untuk menjalankan server database (dengan json-server pada port 3000 pada [fakedb.json](./data/fakedb.json)

```bash
npm run server
```bash

untuk menjalankan aplikasi, gunakan perintah berikut di terminal:

```bash
npm start
```

terakhir, beberapa contoh request berapa di folder [request](./request)

## 3. Penjelasan Tambahan
1. pada bagian [models/song](./models/song.js) saya coba buat kelas song sebagai abstraksi dari song yang ada di playlist, dimana song memiliki atribut title, artist, url, dan playCount, dan tentunya id. saya sebisa mungkin ingin meniru abtraksi dari module mongoose, yang kemudian digunakan di [controllers](./controllers/)

2. abtraksi [models/playlist](./models/playlist.js) dengan ide awawl bahwa playlist akan menampung id id dari song. namun tidak jadi saya gunakan ..., saya asumsikan `songs` pada json-server sudah menjadi list-list playlist saya :D.


