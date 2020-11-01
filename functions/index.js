const functions = require('firebase-functions')

const { getAllTracks } = require('./handlers/tracks')

const {
  signup,
  login,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  // markNotificationsRead,
} = require('./handlers/users')

const express = require('express')
const app = express()
const FBAuth = require('./util/FBAuth')
const checkAdminStatus = require('./util/checkAdminStatus')
const { db } = require('./util/admin')
const { deleteCommentary } = require('./handlers/commentary')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// tracks routes
app.get('/tracks', getAllTracks)
// app.post('/scream', FBAuth, postOneScream)
// app.get('/scream/:screamId', getScream)
app.delete('/track/:trackId', FBAuth, deleteTrack) // probably won't take this approach
app.get('/track/:trackId/vote', FBAuth, voteForTrack) //may not need this either
app.get('/track/:trackId/unvote', FBAuth, unvoteForTrack) //may not need this either

//commentary
app.get('/commentary', getAllCommentary)
app.post('/commentary', FBAuth, checkAdminStatus, postCommentary)
app.get('/commentary/:commentaryId', getCommentary) // may not use this
app.delete(
  '/commentary/:commentaryId',
  FBAuth,
  checkAdminStatus,
  deleteCommentary
)

// User routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)
app.get('/user/:userName', getUserDetails)

exports.api = functions.https.onRequest(app)
