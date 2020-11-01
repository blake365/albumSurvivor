const { user } = require('firebase-functions/lib/providers/auth')
const { db } = require('../util/admin')

exports.getAllTracks = (req, res) => {
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
        })
      })
      return res.json(commentaries)
    })
    .catch(err => console.error(err))
}

exports.voteForTrack = (req, res) => {
  const voteDocument = db
    .collection('votes')
    .where('userName', '==', req.user.userName)
    .where('trackId', '==', req.params.trackId)
    .limit(1)

  const trackDocument = db.doc(`/tracks/${req.params.trackId}`)

  let trackData

  trackDocument
    .get()
    .then(doc => {
      if (doc.exists) {
        trackData = doc.data()
        trackData.trackId = doc.id
        return voteDocument.get()
      } else {
        return res.status(404).json({ error: 'Track not found' })
      }
    })
    .then(data => {
      if (data.empty) {
        return db
          .collection('votes')
          .add({
            trackId: req.params.trackId,
            name: req.params.name,
            userName: req.user.userName,
            createdAt: new Date().toISOString(),
          })
          .then(() => {
            trackData.votes++
            return trackDocument.update({
              votes: trackData.votes,
            })
          })
          .then(() => {
            return res.json(trackData)
          })
      } else {
        return res.status(400).json({ error: 'Track already voted for' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

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
