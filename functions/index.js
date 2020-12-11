const functions = require('firebase-functions')
const cors = require('cors')

const {
  getAliveTracks,
  getDeadTracks,
  castVote,
  payRespects,
  postNewTrack,
  // tallyAllVotes,
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
  castVote2,
  payRespects2,
  // editTrackDetails,
} = require('./handlers/albums')

const {
  getAllArchives,
  getOneArchiveEntry,
  archiveTest,
} = require('./handlers/archives')

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
app.use(cors())

// tracks routes
app.get('/tracks', getAliveTracks)
app.post('/track', FBAuth, checkAdminStatus, postNewTrack)
// app.get('/tracks/tally', tallyAllVotes) testing ground
app.get('/tracks/dead', getDeadTracks)
app.post('/tracks/:trackId/vote', FBAuth, castVote)
app.get('/tracks/:trackId/payrespects', FBAuth, payRespects)

//TODO: build archive routes and handlers
//archive routes
app.get('/archives', getAllArchives)
// app.get('/archives/archive', archiveTest)
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
//TODO: put route for editing track data
// app.put(
//   '/albums/:albumId/tracks/:trackId',
//   FBAuth,
//   checkAdminStatus,
//   editTrackDetails
// )

//make vote and like functions for tracks nested in albums
app.post('/albums/:albumId/tracks/:trackId/vote', FBAuth, castVote2)
app.get('/albums/:albumId/tracks/:trackId/payrespects', FBAuth, payRespects2)

//commentary
// TODO: edit commentary route and handler
app.get('/commentary', getAllCommentary)
app.post('/commentary', FBAuth, checkAdminStatus, postCommentary)
// app.get('/commentary/:commentaryId', getCommentary) -- may not use this
// TODO: add ui for commentary deletion
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

// updated vote tally function
//vote tally
// minutes, hours, day of month, month, day of week - '0 0 * * *' daily at midnight
exports.tallyAllVotes = functions.pubsub
  .schedule('0 19 * * *')
  .timeZone('America/New_York')
  .onRun(context => {
    console.log('This will be run every day at 7PM Eastern!')
    //get the active albums
    db.collection('albums')
      .where('activePoll', '==', true)
      .get()
      .then(data => {
        //get the tracks from each album
        data.forEach(album => {
          db.collection(`albums/${album.data().albumId}/tracks`)
            //only alive tracks
            .where('alive', '==', true)
            // sort so the most votes is first item
            .orderBy('votes', 'desc')
            .get()
            .then(query => {
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
            })
        })
        // return res.json({ message: 'votes counted and reset' })
      })
      .catch(err => {
        console.log(err)
      })
  })

// TODO: write archive votes function

//archive data before vote tally
exports.archivePollData = functions.pubsub
  .schedule('58 18 * * *')
  .timeZone('America/New_York')
  .onRun(context => {
    console.log('This will be run every day at 6:58PM Eastern!')
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
            archiveCreatedAt: new Date(),
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
