const { user } = require('firebase-functions/lib/providers/auth')
const { db } = require('../util/admin')

exports.getLatestCommentary = (req, res) => {
  db.collection('commentary')
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
    .then(data => {
      let commentary = {}
      commentary = data.docs[0].data()
      return res.json(commentary)
    })
    .catch(err => console.error(err))
}

exports.postCommentary = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ error: 'Body must not be empty' })
  }

  const newCommentary = {
    body: req.body.body,
    userName: req.user.userName,
    createdAt: new Date(),
  }

  db.collection('commentary')
    .add(newCommentary)
    .then(doc => {
      const resCommentary = newCommentary
      resCommentary.commentaryId = doc.id
      return res.status(200).json({ message: 'Text Updated' })
    })
    .catch(err => {
      return res.status(500).json({ error: 'something went wrong' })
    })
}

exports.getCommentary = (req, res) => {
  let commentaryData = {}
  db.doc(`/commentary/${req.params.commentaryId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Commentary not found' })
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
