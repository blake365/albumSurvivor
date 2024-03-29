const { db, admin } = require('../util/admin')
const config = require('../util/config')
const firebase = require('firebase')
firebase.initializeApp(config)

const { validateSignupData, validateLoginData } = require('../util/validators')

// signup
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  }

  const dummyVote = {
    trackId: 123,
    voteDay: 0,
    createdAt: new Date().getTime(),
  }

  const { valid, errors } = validateSignupData(newUser)

  if (!valid) return res.status(400).json(errors)

  let token, userId
  db.doc(`/users/${newUser.userName}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ userName: 'This username is already taken' })
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then(idToken => {
      token = idToken
      const userCredentials = {
        email: newUser.email,
        createdAt: new Date().getTime(),
        userId: userId,
        type: 'basic',
      }
      return db.doc(`/users/${newUser.userName}`).set(userCredentials)
    })
    .then(() => {
      return db
        .doc(`users/${newUser.userName}/`)
        .collection('votes')
        .add(dummyVote)
    })
    .then(() => {
      return res.status(201).json({ token })
    })
    .catch(err => {
      console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already in use' })
      } else {
        res
          .status(500)
          .json({ general: 'Something went wrong, please try again' })
      }
    })
}

//login
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  }

  const { valid, errors } = validateLoginData(user)

  if (!valid) return res.status(400).json(errors)

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken()
    })
    .then(token => {
      return res.json({ token })
    })
    .catch(err => {
      console.error(err)
      //auth/wrong-password
      //auth/user-not-found
      return res
        .status(403)
        .json({ general: 'Wrong credentials, please try again' })
    })
}

//get any users details
// exports.getUserDetails = (req, res) => {
//   let userData = {}
//   db.doc(`/users/${req.params.userName}`)
//     .get()
//     .then(doc => {
//       if (doc.exists) {
//         userData.user = doc.data()
//         console.log(userData.user)
//         return db
//           .collection(`/users/${req.params.userName}/votes`)
//           .orderBy('createdAt', 'desc')
//           .get()
//       } else {
//         return res.status(404).json({ error: 'User not found' })
//       }
//     })
//     .then(data => {
//       userData.voteHistory = []
//       data.forEach(doc => {
//         userData.voteHistory.push({
//           createdAt: doc.data().createdAt,
//           trackId: doc.data().trackId,
//         })
//       })
//       return res.json(userData)
//     })
//     .catch(err => {
//       console.error(err)
//       return res.status(500).json({ error: err.code })
//     })
// }

// get own user details
exports.getAuthenticatedUser = (req, res) => {
  let userData = {}
  db.doc(`/users/${req.user.userName}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        userData.credentials = doc.data()
        return db
          .collection(`/users/${req.user.userName}/votes`)
          .orderBy('createdAt', 'desc')
          .get()
      } else {
        return res.status(404).json({ error: 'User not found' })
      }
    })
    .then(data => {
      userData.voteHistory = []
      data.forEach(doc => {
        userData.voteHistory.push({
          createdAt: doc.data().createdAt,
          trackId: doc.data().trackId,
          name: doc.data().name,
          albumArt: doc.data().albumArt,
        })
      })
      return res.json(userData)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}
