const functions = require('firebase-functions')

const {
  getAliveTracks,
  getDeadTracks,
  castVote,
  payRespects,
  postNewTrack,
  // tallyVotesTest,
} = require('./handlers/tracks')

const {
  getAllAlbums,
  getActiveAlbums,
  getOneAlbum,
  postNewAlbum,
  getOneAlbumsTracks,
  postNewTrackToAlbum,
  uploadImage,
  editAlbumDetails,
} = require('./handlers/albums')

// const { getArchivedRounds, getIndividualRound } = require('./handlers/archives')

const {
  getAllCommentary,
  postCommentary,
  getCommentary,
  deleteCommentary,
} = require('./handlers/commentary')

const {
  signup,
  login,
  // addUserDetails,
  getAuthenticatedUser,
  // getUserDetails,
} = require('./handlers/users')

const express = require('express')
const app = express()
const FBAuth = require('./util/FBAuth')
const checkAdminStatus = require('./util/checkAdminStatus')
const { db } = require('./util/admin')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// tracks routes
app.get('/tracks', getAliveTracks)
app.post('/track', FBAuth, checkAdminStatus, postNewTrack)
// app.get('/tracks/tally', tallyVotesTest)
app.get('/tracks/dead', getDeadTracks)
app.post('/tracks/:trackId/vote', FBAuth, castVote)
app.get('/tracks/:trackId/payrespects', FBAuth, payRespects)

//TODO: build archive routes and handlers
//archive routes
// app.get('/archives', getArchivedRounds)
// app.get('/archives/:roundId', getIndividualRound)

//album routes
app.get('/albums', getAllAlbums)
app.post('/albums/:albumId/art', FBAuth, uploadImage)
app.get('/albums/active', getActiveAlbums)
app.get('/albums/:albumId', getOneAlbum)
app.get('/albums/:albumId/tracks', getOneAlbumsTracks)
app.post('/albums', FBAuth, checkAdminStatus, postNewAlbum)
app.post(
  '/albums/:albumId/tracks',
  FBAuth,
  checkAdminStatus,
  postNewTrackToAlbum
)
//TODO: put route for editing album data
app.put('/albums/:albumId', FBAuth, checkAdminStatus, editAlbumDetails)

//TODO: make vote and like functions for tracks nested in albums
// app.post('/albums/:albumId/tracks/:trackId/vote', FBAuth, castVote)
// app.get('/albums/:albumId/tracks/:trackId/payrespects', FBAuth, payRespects)

//commentary
app.get('/commentary', getAllCommentary)
app.post('/commentary', FBAuth, checkAdminStatus, postCommentary)
// app.get('/commentary/:commentaryId', getCommentary) -- may not use this
app.delete(
  '/commentary/:commentaryId',
  FBAuth,
  checkAdminStatus,
  deleteCommentary
)

// User routes
app.post('/signup', signup)
app.post('/login', login)
app.get('/user', FBAuth, getAuthenticatedUser)
// app.get('/user/:userName', getUserDetails)

exports.api = functions.https.onRequest(app)

//vote tally

// minutes, hours, day of month, month, day of week - '0 0 * * *' daily at midnight
exports.scheduledFunctionCrontab = functions.pubsub
  .schedule('0 19 * * *')
  .timeZone('America/New_York')
  .onRun(context => {
    console.log('This will be run every day at 7PM Eastern!')
    db.collection('tracks')
      .where('alive', '==', true)
      .get()
      .then(data => {
        // find the highest number of votes
        let mostVotes = 0
        data.forEach(track => {
          if (mostVotes < track.data().votes) mostVotes = track.data().votes
        })
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
            console.log(trackId)
            return trackId
          })
          .then(trackId => {
            db.doc(`tracks/${trackId}`)
              .get()
              .then(doc => {
                return doc.ref.update({
                  alive: false,
                  voteOutDay: new Date(),
                  respect: 0,
                })
              })
              .then(() => {
                console.log('made it to vote reset')
                let aliveTracks = []
                db.collection('tracks')
                  .where('alive', '==', true)
                  .get()
                  .then(data => {
                    data.forEach(track => {
                      aliveTracks.push(track.data())
                    })
                    return aliveTracks
                  })
                  .then(() => {
                    // console.log(aliveTracks)
                    let batch = db.batch()
                    if (aliveTracks.length > 0) {
                      aliveTracks.forEach(track => {
                        batch.update(db.doc(`tracks/${track.trackId}`), {
                          votes: 0,
                        })
                      })
                      batch
                        .commit()
                        .then(() => {
                          console.log('made it to end with no errors')
                          return
                        })
                        .catch(err => {
                          console.error(err)
                        })
                    } else {
                      return
                    }
                  })
              })
          })
          .catch(err => {
            console.log(err)
          })
      })
  })
