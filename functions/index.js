const functions = require('firebase-functions')
const cors = require('cors')

// const {
//   getAliveTracks,
//   getDeadTracks,
//   castVote,
//   payRespects,
//   postNewTrack,
//   // tallyAllVotes,
//   // tallyVotesTest,
// } = require('./handlers/tracks')

const {
  getAllAlbums,
  getActiveAlbums,
  getOneAlbum,
  postNewAlbum,
  getOneAlbumsTracks,
  postNewTrackToAlbum,
  uploadImage,
  editAlbumDetails,
  editTrackDetails,
  castVote2,
  payRespects2,
  // tallyVotesTest,
  anonVote,
  // roundWinnerTest,
  // roundEndedTest,
  // editTrackDetails,
} = require('./handlers/albums')

const {
  getArchives,
  getOneArchiveEntry,
  // archiveTest,
} = require('./handlers/archives')

const { getLatestCommentary, postCommentary } = require('./handlers/commentary')

const { signup, login, getAuthenticatedUser } = require('./handlers/users')

const express = require('express')
const app = express()
const FBAuth = require('./util/FBAuth')
const checkAdminStatus = require('./util/checkAdminStatus')
const { db } = require('./util/admin')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// OLD tracks routes
// app.get('/tracks', getAliveTracks)
// app.post('/track', FBAuth, checkAdminStatus, postNewTrack)
// app.get('/tracks/dead', getDeadTracks)
// app.post('/tracks/:trackId/vote', FBAuth, castVote)
// app.get('/tracks/:trackId/payrespects', FBAuth, payRespects)

// vote tally test
// app.get('/albums/tally', tallyVotesTest)

//archive routes
app.post('/archives', getArchives)
app.get('/archives/:archiveId', getOneArchiveEntry)

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
app.put('/albums/:albumId', FBAuth, checkAdminStatus, editAlbumDetails)
//put route for editing track data
app.put(
  '/albums/:albumId/tracks/:trackId',
  FBAuth,
  checkAdminStatus,
  editTrackDetails
)
//TODO: delete routes for albums and tracks

// vote and like functions for tracks nested in albums
app.post('/albums/:albumId/tracks/:trackId/anonVote', anonVote)
app.post('/albums/:albumId/tracks/:trackId/vote', FBAuth, castVote2)
app.get('/albums/:albumId/tracks/:trackId/payrespects', FBAuth, payRespects2)

//commentary aka 'what's happening' text
app.get('/commentary', getLatestCommentary)
app.post('/commentary', FBAuth, checkAdminStatus, postCommentary)
// app.delete(
//   '/commentary/:commentaryId',
//   FBAuth,
//   checkAdminStatus,
//   deleteCommentary
// )

// round ending and winner test routes
// app.get('/roundEnded', roundEndedTest)
// app.get('/roundWinner', roundWinnerTest)

// User routes
app.post('/signup', signup)
app.post('/login', login)
app.get('/user', FBAuth, getAuthenticatedUser)

exports.api = functions.https.onRequest(app)

//check for round ended
exports.checkForRoundEnded = functions.pubsub
  .schedule('59 18 * * *')
  .timeZone('America/New_York')
  .onRun(context => {
    console.log('This will be run every day at 6:59PM Eastern!')
    //get the active albums
    db.collection('albums')
      .where('activePoll', '==', true)
      .get()
      .then(data => {
        //get the tracks from each album
        data.forEach(album => {
          db.collection(`albums/${album.data().albumId}/tracks`)
            .where('alive', '==', true)
            .get()
            .then(query => {
              if (query.docs.length === 0) {
                let albumDocument = db.doc(`albums/${album.data().albumId}`)
                return albumDocument.get().then(doc => {
                  console.log(doc.data().albumName)
                  return albumDocument.update({
                    activePoll: false,
                  })
                })
              } else {
                return
              }
            })
          console.log('complete')
          return
        })
      })
      .catch(err => {
        console.error(err)
      })
  })

//check for final round
exports.checkForRoundWinner = functions.pubsub
  .schedule('5 19 * * *')
  .timeZone('America/New_York')
  .onRun(context => {
    console.log('This will be run every day at 7:05PM Eastern!')
    //get the active albums
    db.collection('albums')
      .where('activePoll', '==', true)
      .get()
      .then(data => {
        //get the tracks from each album
        data.forEach(album => {
          db.collection(`albums/${album.data().albumId}/tracks`)
            .where('alive', '==', true)
            .get()
            .then(query => {
              if (query.docs.length === 1) {
                let trackDocument = db.doc(
                  `albums/${album.data().albumId}/tracks/${
                    query.docs[0].data().trackId
                  }`
                )
                let trackData = {}
                return trackDocument.get().then(doc => {
                  console.log(doc.data().name)
                  trackData = doc.data()
                  trackData.votes++
                  console.log(trackData.votes)
                  return trackDocument.update({
                    votes: trackData.votes,
                  })
                })
              } else {
                return
              }
            })
          return
        })
      })
      .catch(err => {
        console.error(err)
      })
  })

// updated vote tally function
//vote tally
// minutes, hours, day of month, month, day of week - '0 0 * * *' daily at midnight
exports.tallyAllVotes = functions.pubsub
  .schedule('1 19 * * *')
  .timeZone('America/New_York')
  .onRun(context => {
    console.log('This will be run every day at 7PM Eastern!')
    //get the active albums
    db.collection('albums')
      .where('activePoll', '==', true)
      .get()
      .then(data => {
        //get the tracks from each album
        data.forEach(
          album => {
            db.collection(`albums/${album.data().albumId}/tracks`)
              .where('alive', '==', true)
              .get()
              .then(query => {
                doc = query.docs
                let roundVoteTotal = 0
                doc.forEach(track => {
                  roundVoteTotal += track.data().votes
                  return roundVoteTotal
                })
                console.log(roundVoteTotal)
                return roundVoteTotal
              })
              .then(roundVoteTotal => {
                db.collection(`albums/${album.data().albumId}/tracks`)
                  //only alive tracks
                  .where('alive', '==', true)
                  // sort so the most votes is first item
                  .orderBy('votes', 'desc')
                  .get()
                  .then(query => {
                    if (query.docs.length >= 1) {
                      //get the first item from the query
                      console.log(query.docs[0].data().name)
                      console.log(query.docs[0].data().trackId)
                      // get the document for the track with the most votes
                      db.doc(
                        `albums/${album.data().albumId}/tracks/${
                          query.docs[0].data().trackId
                        }`
                      )
                        .get()
                        .then(doc => {
                          // update document so alive=false and new fields are added
                          return doc.ref.update({
                            alive: false,
                            voteOutDay: new Date(),
                            respect: 0,
                            roundVoteTotal: roundVoteTotal,
                          })
                        })
                        .then(() => {
                          console.log('made it to vote reset')
                          let aliveTracks = []
                          db.collection(`albums/${album.data().albumId}/tracks`)
                            //new list of alive tracks
                            .where('alive', '==', true)
                            .get()
                            .then(data => {
                              data.forEach(track => {
                                aliveTracks.push(track.data())
                              })
                              return aliveTracks
                            })

                            .then(() => {
                              let batch = db.batch()
                              if (aliveTracks.length > 0) {
                                aliveTracks.forEach(track => {
                                  batch.update(
                                    db.doc(
                                      `albums/${album.data().albumId}/tracks/${
                                        track.trackId
                                      }`
                                    ),
                                    {
                                      votes: 0,
                                    }
                                  )
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
                    } else {
                      return
                    }
                  })
              })
          }
          // return res.json({ message: 'votes counted and reset' })
        )
      })
      .catch(err => {
        console.log(err)
      })
  })

//archive data before vote tally
exports.archivePollData = functions.pubsub
  .schedule('0 19 * * *')
  .timeZone('America/New_York')
  .onRun(context => {
    console.log('This will be run every day at 6:59PM Eastern!')
    //get albums to archive
    db.collection('albums')
      .where('activePoll', '==', true)
      .orderBy('createdAt')
      .get()
      .then(data => {
        let activeAlbumList = []
        data.forEach(doc => {
          activeAlbumList.push((albumData = doc.data()))
        })
        activeAlbumList.forEach(album => {
          albumArchive = {
            albumName: album.albumName,
            albumId: album.albumId,
            archiveCreatedAt: new Date().getTime(),
            archiveId: '',
          }
          console.log(albumArchive)
          db.collection('archive')
            .add(albumArchive)
            .then(doc => {
              let archiveId = doc.id
              doc.update({
                archiveId: doc.id,
              })
              return archiveId
            })
            .then(archiveId => {
              db.collection(`albums/${album.albumId}/tracks`)
                .orderBy('trackListing')
                .get()
                .then(data => {
                  data.forEach(doc => {
                    archiveTrack = {
                      name: doc.data().name,
                      votes: doc.data().votes,
                      trackId: doc.data().trackId,
                      trackListing: doc.data().trackListing,
                      alive: doc.data().alive,
                    }
                    db.collection(`archive/${archiveId}/tracks`).add(
                      archiveTrack
                    )
                  })
                })
            })
        })
      })
    return json({ message: 'archive created' })
  })

//old vote tally for only one poll
// minutes, hours, day of month, month, day of week - '0 0 * * *' daily at midnight
// exports.scheduledFunctionCrontab = functions.pubsub
//   .schedule('0 19 * * *')
//   .timeZone('America/New_York')
//   .onRun(context => {
//     console.log('This will be run every day at 7PM Eastern!')
//     db.collection('tracks')
//       .where('alive', '==', true)
//       .get()
//       .then(data => {
//         // find the highest number of votes
//         let mostVotes = 0
//         data.forEach(track => {
//           if (mostVotes < track.data().votes) mostVotes = track.data().votes
//         })
//         return mostVotes
//       })
//       .then(mostVotes => {
//         // use highest number of votes to get specific track
//         return db
//           .collection('tracks')
//           .where('votes', '==', mostVotes)
//           .limit(1)
//           .get()
//           .then(query => {
//             let trackId = ''
//             query.forEach(doc => {
//               //set track to alive: false
//               trackId = doc.data().trackId
//             })
//             console.log(trackId)
//             return trackId
//           })
//           .then(trackId => {
//             db.doc(`tracks/${trackId}`)
//               .get()
//               .then(doc => {
//                 return doc.ref.update({
//                   alive: false,
//                   voteOutDay: new Date(),
//                   respect: 0,
//                 })
//               })
//               .then(() => {
//                 console.log('made it to vote reset')
//                 let aliveTracks = []
//                 db.collection('tracks')
//                   .where('alive', '==', true)
//                   .get()
//                   .then(data => {
//                     data.forEach(track => {
//                       aliveTracks.push(track.data())
//                     })
//                     return aliveTracks
//                   })
//                   .then(() => {
//                     // console.log(aliveTracks)
//                     let batch = db.batch()
//                     if (aliveTracks.length > 0) {
//                       aliveTracks.forEach(track => {
//                         batch.update(db.doc(`tracks/${track.trackId}`), {
//                           votes: 0,
//                         })
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
//           .catch(err => {
//             console.log(err)
//           })
//       })
//   })
