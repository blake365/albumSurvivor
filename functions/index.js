const functions = require('firebase-functions')

const { getAliveTracks, getDeadTracks, castVote } = require('./handlers/tracks')

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
app.get('/tracks/dead', getAliveTracks)
app.post('/tracks/:trackId/vote', FBAuth, castVote)

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
app.get('/user', FBAuth, getAuthenticatedUser)
// app.get('/user/:userName', getUserDetails)

exports.api = functions.https.onRequest(app)

//TODO: create daily reset and vote tally function
