const { user } = require('firebase-functions/lib/providers/auth')
const { db } = require('../util/admin')

exports.getAllCommentary = (req, res) => {
  db.collection('commentary')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let commentaries = []
      data.forEach(doc => {
        commentaries.push({
          commentaryId: doc.id,
          body: doc.data().body,
          userName: doc.data().userName,
          createdAt: doc.data().createdAt,
        })
      })
      return res.json(commentaries)
    })
    .catch(err => console.error(err))
}

exports.postCommentary = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Body must not be empty' })
  }

  const newCommentary = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  }

  db.collection('commentary')
    .add(newCommentary)
    .then(doc => {
      const resCommentary = newCommentary
      resCommentary.commentaryId = doc.id
      res.json(resCommentary)
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
}

exports.getCommentary = (req, res) => {
  let commentaryData = {}
  db.doc(`/commentary/${req.params.commentaryId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' })
      }
      commentaryData = doc.data()
      commentaryData.commentaryId = doc.id
      return res.json(commentaryData)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: err.code })
    })
}

exports.deleteCommentary = (req, res) => {
  const document = db.doc(`/commentary/${req.params.commentaryId}`)

  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Commentary not found' })
      }
      if (doc.data().userName !== req.user.userName) {
        return res.status(403).json({ error: 'Unathorized' })
      } else {
        return document.delete()
      }
    })
    .then(() => {
      res.json({ message: 'Commentary deleted successfully' })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}
