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
        activeAlbumList.push((albumData = doc.data()))
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

//get just tracks from a specific album
exports.getOneAlbumsTracks = (req, res) => {
  db.collection(`albums/${req.params.albumId}/tracks`)
    .orderBy('trackListing', 'asc')
    .get()
    .then(data => {
      trackData = []
      data.forEach(doc => {
        trackData.push((track = doc.data()))
      })
      return res.json(trackData)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
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
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
}

exports.postNewTrackToAlbum = (req, res) => {
  if (req.body.name.trim() === '' || req.body.trackListing.trim() === '') {
    return res.status(400).json({ body: 'Field(s) must not be empty' })
  }

  let trackListing = parseInt(req.body.trackListing)

  const newTrack = {
    name: req.body.name,
    description: req.body.description,
    trackListing: trackListing,
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

// edit album details function
exports.editAlbumDetails = (req, res) => {
  const editAlbumData = {
    albumName: req.body.albumName,
    artist: req.body.artist,
    genre: req.body.genre,
    numTracks: req.body.numTracks,
    releaseYear: req.body.releaseYear,
    activePoll: req.body.activePoll,
  }

  db.doc(`albums/${req.params.albumId}`)
    .get()
    .then(doc => {
      console.log(editAlbumData)
      function clean(obj) {
        for (var propName in obj) {
          if (obj[propName] === null || obj[propName] === '') {
            delete obj[propName]
          }
        }
      }
      clean(editAlbumData)
      console.log(editAlbumData)
      return doc.ref.update(editAlbumData)
    })
    .then(() => {
      return res.status(200).json({ message: 'Album Edited' })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
}

// cast vote function
exports.castVote2 = (req, res) => {
  const voteDocument = {
    trackId: req.params.trackId,
    createdAt: new Date().toISOString(),
    voteDay: new Date().getDate(),
    name: '',
    albumId: req.params.albumId,
    albumArt: '',
  }

  let todayDate = new Date().getDate()
  // TODO: limit should equal number of active polls
  db.collection(`/users/${req.user.userName}/votes`)
    .orderBy('createdAt', 'desc')
    .limit(3)
    .get()
    .then(query => {
      doc = query.docs
      console.log('')
      const votemap = doc.map(doc => {
        let didVote
        if (
          doc.data().voteDay === todayDate &&
          doc.data().albumId === req.params.albumId
        ) {
          didVote = true
        } else {
          didVote = false
        }
        return didVote
      })
      console.log(votemap)

      if (votemap.includes(true)) {
        return res.status(403).json({ error: 'You have already voted today!' })
      } else {
        const trackDocument = db.doc(
          `/albums/${req.params.albumId}/tracks/${req.params.trackId}`
        )
        let trackData = {}
        return trackDocument
          .get()
          .then(doc => {
            trackData = doc.data()
            trackData.trackId = doc.id
            trackData.name = doc.data().name
            voteDocument.name = trackData.name
            trackData.votes++
            return trackDocument.update({
              votes: trackData.votes,
            })
          })
          .then(() => {
            db.collection(`/users/${req.user.userName}/votes`).add(voteDocument)
          })
          .then(() => {
            return res.status(200).json({
              message: 'Your vote has been submitted!',
              voteHistory: voteDocument,
            })
          })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

// TODO: pay respects to graveyard tracks
// song will not recieve respect until a respect field is added when it is voted out
exports.payRespects2 = (req, res) => {
  const trackDocument = db.doc(
    `/albums/${req.params.albumId}/tracks/${req.params.trackId}`
  )
  let trackData = {}

  trackDocument
    .get()
    .then(doc => {
      trackData = doc.data()
      if (doc.data().respect < 999) {
        trackData.respect++
        return trackDocument.update({
          respect: trackData.respect,
        })
      } else return trackData
    })
    .then(() => {
      return res.json(trackData)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
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

// exports.tallyVotesTest = (req, res) => {
//   //get the active albums
//   console.log('start')
//   db.collection('albums')
//     .where('activePoll', '==', true)
//     .get()
//     .then(data => {
//       //get the tracks from each album
//       data.forEach(album => {
//         db.collection(`albums/${album.data().albumId}/tracks`)
//           //only alive tracks
//           .where('alive', '==', true)
//           // sort so the most votes is first item
//           .orderBy('votes', 'desc')
//           .get()
//           .then(query => {
//             if (query.docs.length >= 1) {
//               //get the first item from the query
//               console.log(query.docs[0].data().name)
//               console.log(query.docs[0].data().trackId)
//               // get the document for the track with the most votes
//               db.doc(
//                 `albums/${album.data().albumId}/tracks/${
//                   query.docs[0].data().trackId
//                 }`
//               )
//                 .get()
//                 .then(doc => {
//                   // update document so alive=false and new fields are added
//                   return doc.ref.update({
//                     alive: false,
//                     voteOutDay: new Date(),
//                     respect: 0,
//                   })
//                 })

//                 .then(() => {
//                   console.log('made it to vote reset')
//                   let aliveTracks = []
//                   db.collection(`albums/${album.data().albumId}/tracks`)
//                     //new list of alive tracks
//                     .where('alive', '==', true)
//                     .get()
//                     .then(data => {
//                       data.forEach(track => {
//                         aliveTracks.push(track.data())
//                       })
//                       return aliveTracks
//                     })

//                     .then(() => {
//                       let batch = db.batch()
//                       if (aliveTracks.length > 0) {
//                         aliveTracks.forEach(track => {
//                           batch.update(
//                             db.doc(
//                               `albums/${album.data().albumId}/tracks/${
//                                 track.trackId
//                               }`
//                             ),
//                             {
//                               votes: 0,
//                             }
//                           )
//                         })
//                         batch
//                           .commit()
//                           .then(() => {
//                             console.log('made it to end with no errors')
//                             return
//                           })
//                           .catch(err => {
//                             console.error(err)
//                           })
//                       } else {
//                         return
//                       }
//                     })
//                 })
//             } else {
//               return
//             }
//           })
//       })
//       return res.json({ message: 'votes counted and reset' })
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }
