const { user } = require('firebase-functions/lib/providers/auth')
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
      if (doc.data().voteDay === todayDate) {
        return res.status(403).json({ error: 'You have already voted today' })
      } else {
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
            return res.json(trackData)
          })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

// exports.voteForTrack = (req, res) => {
//   const voteDocument = db
//     .collection(`/users/${req.params.userName}/votes`)
//     .where('trackId', '==', req.params.trackId)
//     .where('voteTime', '==', new Date().toISOString())
//     .limit(1)

//   const trackDocument = db.doc(`/tracks/${req.params.trackId}`)

//   let trackData = {}

//   trackDocument
//     .get()
//     .then(doc => {
//       if (doc.exists) {
//         trackData = doc.data()
//         trackData.trackId = doc.id
//         return voteDocument.get()
//       } else {
//         return res.status(404).json({ error: 'Track not found' })
//       }
//     })
//     //TODO: will probably need to change this to allow daily voting
//     //FIXME: currently only limits to 1 vote per track instead of 1 vote per day/list of tracks
//     .then(data => {
//       if (data.empty) {
//         return db
//           .collection('votes')
//           .add({
//             trackId: req.params.trackId,
//             userName: req.user.userName,
//             name: trackData.name,
//             createdAt: new Date().toISOString(),
//           })
//           .then(() => {
//             trackData.votes++
//             return trackDocument.update({
//               votes: trackData.votes,
//             })
//           })
//           .then(() => {
//             return res.json(trackData)
//           })
//       } else {
//         return res.status(400).json({ error: 'Track already voted for' })
//       }
//     })
//     .catch(err => {
//       console.error(err)
//       res.status(500).json({ error: err.code })
//     })
// }

//TODO: add new tracks for new poll creation

// exports.postNewTrack = (req, res) => {
//   if (req.body.body.trim() === '') {
//     return res.status(400).json({ body: 'Body must not be empty' })
//   }

//   const newCommentary = {
//     body: req.body.body,
//     userHandle: req.user.handle,
//     createdAt: new Date().toISOString(),
//   }

//   db.collection('commentary')
//     .add(newCommentary)
//     .then(doc => {
//       const resCommentary = newCommentary
//       resCommentary.commentaryId = doc.id
//       res.json(resCommentary)
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'something went wrong' })
//       console.error(err)
//     })
// }

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
// }
