// const { user } = require('firebase-functions/lib/providers/auth')
const { db } = require('../util/admin')

exports.getAliveTracks = (req, res) => {
  db.collection('tracks')
    .where('alive', '==', true)
    .orderBy('trackListing')
    .get()
    .then(data => {
      let trackList = []
      data.forEach(doc => {
        trackList.push({
          trackId: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          votes: doc.data().votes,
          trackListing: doc.data().trackListing,
        })
      })
      return res.json(trackList)
    })
    .catch(err => console.error(err))
}

exports.getDeadTracks = (req, res) => {
  db.collection('tracks')
    .where('alive', '==', false)
    .orderBy('voteOutDay', 'desc')
    .get()
    .then(data => {
      let deadTrackList = []
      data.forEach(doc => {
        deadTrackList.push({
          trackId: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          votes: doc.data().votes,
          trackListing: doc.data().trackListing,
          voteOutDay: doc.data().voteOutDay,
          respect: doc.data().respect,
        })
      })
      return res.json(deadTrackList)
    })
    .catch(err => console.error(err))
}

exports.castVote = (req, res) => {
  // console.log(req.params)
  // console.log(req.user)

  const voteDocument = {
    trackId: req.params.trackId,
    createdAt: new Date().toISOString(),
    voteDay: new Date().getDate(),
    name: '',
  }

  let todayDate = new Date().getDate()

  db.collection(`/users/${req.user.userName}/votes`)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
    .then(query => {
      doc = query.docs[0]
      if (doc.data().voteDay !== todayDate) {
        const trackDocument = db.doc(`/tracks/${req.params.trackId}`)
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
      } else {
        return res.status(403).json({ error: 'You have already voted today!' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

//vote tally
// minutes, hours, day of month, month, day of week - '0 0 * * *' daily at midnight
// exports.tallyAllVotes = (req, res) => {
//   //get the active albums
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
//             //get the first item from the query
//             console.log(query.docs[0].data().name)
//             console.log(query.docs[0].data().trackId)
//             // get the document for the track with the most votes
//             db.doc(
//               `albums/${album.data().albumId}/tracks/${
//                 query.docs[0].data().trackId
//               }`
//             )
//               .get()
//               .then(doc => {
//                 // update document so alive=false and new fields are added
//                 return doc.ref.update({
//                   alive: false,
//                   voteOutDay: new Date(),
//                   respect: 0,
//                 })
//               })

//               .then(() => {
//                 console.log('made it to vote reset')
//                 let aliveTracks = []
//                 db.collection(`albums/${album.data().albumId}/tracks`)
//                   //new list of alive tracks
//                   .where('alive', '==', true)
//                   .get()
//                   .then(data => {
//                     data.forEach(track => {
//                       aliveTracks.push(track.data())
//                     })
//                     return aliveTracks
//                   })

//                   .then(() => {
//                     let batch = db.batch()
//                     if (aliveTracks.length > 0) {
//                       aliveTracks.forEach(track => {
//                         batch.update(
//                           db.doc(
//                             `albums/${album.data().albumId}/tracks/${
//                               track.trackId
//                             }`
//                           ),
//                           {
//                             votes: 0,
//                           }
//                         )
//                       })
//                       batch
//                         .commit()
//                         .then(() => {
//                           console.log('made it to end with no errors')
//                           return
//                         })
//                         .catch(err => {
//                           console.error(err)
//                         })
//                     } else {
//                       return
//                     }
//                   })
//               })
//           })
//       })
//       return res.json({ message: 'votes counted and reset' })
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }
// exports.tallyVotesTest = (req, res) => {
//   let aliveTracks = []
//   db.collection('tracks')
//     .where('alive', '==', true)
//     .get()
//     .then(data => {
//       // find the highest number of votes
//       let mostVotes = 0
//       data.forEach(track => {
//         aliveTracks.push(track.data())
//         if (mostVotes < track.data().votes) mostVotes = track.data().votes
//       })
//       // console.log(aliveTracks)
//       return mostVotes
//     })
//     .then(mostVotes => {
//       // use highest number of votes to get specific track
//       return db
//         .collection('tracks')
//         .where('votes', '==', mostVotes)
//         .limit(1)
//         .get()
//         .then(query => {
//           let trackId = ''
//           query.forEach(doc => {
//             //set track to alive: false
//             trackId = doc.data().trackId
//           })
//           return trackId
//         })
//         .then(trackId => {
//           db.doc(`tracks/${trackId}`)
//             .get()
//             .then(doc => {
//               return doc.ref.update({
//                 alive: false,
//               })
//             })
//         })
//         .then(() => {
//           // console.log(aliveTracks)
//           let batch = db.batch()
//           if (aliveTracks.length > 0) {
//             aliveTracks.forEach(track => {
//               batch.update(db.doc(`tracks/${track.trackId}`), { votes: 0 })
//             })
//             batch
//               .commit()
//               .then(() => {
//                 return res.json({
//                   message: 'It is a new day! Votes reset to 0',
//                 })
//               })
//               .catch(err => {
//                 console.error(err)
//                 return res.status(500).json({ error: err.code })
//               })
//           } else {
//             return
//           }
//         })
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

exports.payRespects = (req, res) => {
  const trackDocument = db.doc(`/tracks/${req.params.trackId}`)
  let trackData = {}

  trackDocument
    .get()
    .then(doc => {
      trackData = doc.data()
      if (doc.data().respect < 1000) {
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

//TODO: add new tracks for new poll creation

exports.postNewTrack = (req, res) => {
  if (req.body.name.trim() === '' || req.body.trackListing.trim() === '') {
    return res.status(400).json({ body: 'Field(s) must not be empty' })
  }

  const newTrack = {
    name: req.body.name,
    description: req.body.description,
    trackListing: req.body.trackListing,
    votes: 0,
    alive: true,
    trackId: '',
  }

  db.collection('tracks')
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

// exports.getTrack = (req, res) => {
//   let commentaryData = {}
//   db.doc(`/commentary/${req.params.commentaryId}`)
//     .get()
//     .then(doc => {
//       if (!doc.exists) {
//         return res.status(404).json({ error: 'Scream not found' })
//       }
//       commentaryData = doc.data()
//       commentaryData.commentaryId = doc.id
//       return res.json(commentaryData)
//     })
//     .catch(err => {
//       console.error(err)
//       res.status(500).json({ error: err.code })
//     })
//
