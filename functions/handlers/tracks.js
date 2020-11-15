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
            return res
              .status(200)
              .json({ message: 'Your vote has been submitted!' })
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

exports.tallyVotesTest = (req, res) => {
  let aliveTracks = []
  db.collection('tracks')
    .where('alive', '==', true)
    .get()
    .then(data => {
      // find the highest number of votes
      let mostVotes = 0
      data.forEach(track => {
        aliveTracks.push(track.data())
        if (mostVotes < track.data().votes) mostVotes = track.data().votes
      })
      // console.log(aliveTracks)
      return mostVotes
    })
    .then(mostVotes => {
      // use highest number of votes to get specific track
      return db
        .collection('tracks')
        .where('votes', '==', mostVotes)
        .limit(1)
        .get()
        .then(query => {
          let trackId = ''
          query.forEach(doc => {
            //set track to alive: false
            trackId = doc.data().trackId
          })
          return trackId
        })
        .then(trackId => {
          db.doc(`tracks/${trackId}`)
            .get()
            .then(doc => {
              return doc.ref.update({
                alive: false,
              })
            })
        })
        .then(() => {
          // console.log(aliveTracks)
          let batch = db.batch()
          if (aliveTracks.length > 0) {
            aliveTracks.forEach(track => {
              batch.update(db.doc(`tracks/${track.trackId}`), { votes: 0 })
            })
            batch
              .commit()
              .then(() => {
                return res.json({
                  message: 'It is a new day! Votes reset to 0',
                })
              })
              .catch(err => {
                console.error(err)
                return res.status(500).json({ error: err.code })
              })
          } else {
            return
          }
        })
    })
    .catch(err => {
      console.log(err)
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
//
