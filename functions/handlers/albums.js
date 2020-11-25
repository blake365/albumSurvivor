const { db, admin } = require('../util/admin')
const config = require('../util/config')
const { uuid } = require('uuidv4')

exports.getAllAlbums = (req, res) => {
  db.collection('albums')
    .get()
    .then(data => {
      let albumList = []
      data.forEach(doc => {
        albumList.push({
          albumId: doc.id,
          createdAt: doc.data().createdAt,
          albumName: doc.data().albumName,
          artist: doc.data().artist,
          albumArt: doc.data().albumArt,
          activePoll: doc.data().activePoll,
          genre: doc.data().genre,
          numTracks: doc.data().numTracks,
          releaseYear: doc.data().releaseYear,
        })
      })
      return res.json(albumList)
    })
    .catch(err => console.error(err))
}

exports.getActiveAlbums = (req, res) => {
  db.collection('albums')
    .where('activePoll', '==', true)
    .orderBy('createdAt')
    .get()
    .then(data => {
      let activeAlbumList = []
      data.forEach(doc => {
        activeAlbumList.push({
          albumId: doc.id,
          createdAt: doc.data().createdAt,
          albumName: doc.data().albumName,
          artist: doc.data().artist,
          albumArt: doc.data().albumArt,
          activePoll: doc.data().activePoll,
          genre: doc.data().genre,
          numTracks: doc.data().numTracks,
          releaseYear: doc.data().releaseYear,
        })
      })
      return res.json(activeAlbumList)
    })
    .catch(err => console.error(err))
}

exports.getOneAlbum = (req, res) => {
  let albumData = {}
  db.doc(`albums/${req.params.albumId}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        albumData.data = doc.data()
        return db
          .collection(`albums/${req.params.albumId}/tracks`)
          .orderBy('trackListing')
          .get()
      } else {
        return res.status(404).json({ error: 'Album not found' })
      }
    })
    .then(data => {
      albumData.tracks = []
      data.forEach(doc => {
        albumData.tracks.push({
          trackId: doc.id,
          alive: doc.data().alive,
          name: doc.data().name,
          description: doc.data().description,
          length: doc.data().length,
          lyrics: doc.data().lyrics,
          spotifyLink: doc.data().spotifyLink,
          numTracks: doc.data().numTracks,
          trackListing: doc.data().trackListing,
          votes: doc.data().votes,
        })
      })
      return res.json(albumData)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

//TODO: write function to get just tracks from a specific album
exports.getOneAlbumsTracks = (req, res) => {
  return res.json({ message: 'finish this' })
}

exports.postNewAlbum = (req, res) => {
  const newAlbum = {
    albumName: req.body.albumName,
    artist: req.body.artist,
    genre: req.body.genre,
    numTracks: req.body.numTracks,
    releaseYear: req.body.releaseYear,
    createdAt: new Date().toISOString(),
    activePoll: req.body.activePoll,
    albumId: '',
  }

  db.collection('albums')
    .add(newAlbum)
    .then(doc => {
      const resAlbum = newAlbum
      resAlbum.albumId = doc.id
      return doc.update({
        albumId: doc.id,
      })
    })
    .then(() => {
      return res.status(200).json({ message: 'Album Added' })
    })
    .then(() => {
      this.uploadImage()
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
}

exports.postNewTrackToAlbum = (req, res) => {
  if (req.body.name.trim() === '' || req.body.trackListing.trim() === '') {
    return res.status(400).json({ body: 'Field(s) must not be empty' })
  }

  const newTrack = {
    name: req.body.name,
    description: req.body.description,
    trackListing: req.body.trackListing,
    length: req.body.length,
    lyrics: req.body.lyrics,
    votes: 0,
    alive: true,
    trackId: '',
  }

  db.collection(`albums/${req.params.albumId}/tracks`)
    .add(newTrack)
    .then(doc => {
      const resTrack = newTrack
      resTrack.trackId = doc.id
      return doc.update({
        trackId: doc.id,
      })
    })
    .then(() => {
      return res.status(200).json({ message: 'Track Added' })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
}

//album art image upload
exports.uploadImage = (req, res) => {
  const BusBoy = require('busboy')
  const path = require('path')
  const os = require('os')
  const fs = require('fs')

  const busboy = new BusBoy({ headers: req.headers })

  let imageFileName
  let imageToBeUploaded = {}
  let generatedToken = uuid()

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (
      mimetype !== 'image/jpeg' &&
      mimetype !== 'image/png' &&
      mimetype !== 'image/jpg'
    ) {
      return res.status(400).json({ error: 'Wrong file type submitted' })
    }
    // image.png
    const imageExtension = filename.split('.')[filename.split('.').length - 1]
    imageFileName = `${Math.round(
      Math.random() * 100000000
    ).toString()}.${imageExtension}`
    const filepath = path.join(os.tmpdir(), imageFileName)
    imageToBeUploaded = { filepath, mimetype }
    file.pipe(fs.createWriteStream(filepath))
  })
  busboy.on('finish', () => {
    admin
      .storage()
      .bucket(config.storageBucket)
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            firebaseaStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        const albumArt = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`
        return db.doc(`/albums/${req.params.albumId}`).update({ albumArt })
      })
      .then(() => {
        return res.json({ message: 'Image uploaded successfully' })
      })
      .catch(err => {
        console.error(err)
        return res.status(500).json({ error: err.code })
      })
  })
  busboy.end(req.rawBody)
}
