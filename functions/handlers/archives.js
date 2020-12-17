const { db } = require('../util/admin')

// maybe calculate limit as 3 times number of active polls

// const first = db
//   .collection('archive')
//   .orderBy('archiveCreatedAt', 'desc')
//   .limit(5)
//   .get()
//   .then(snapshot => {
//     last = snapshot.docs[snapshot.docs.length - 1]
//     console.log(last)
//     return last
//   })
// var next

// var first = db
//   .collection('archive')
//   .orderBy('archiveCreatedAt', 'desc')
//   .limit(5)

// function paginate() {
//   first.get().then(function (documentSnapshots) {
//     // Get the last visible document
//     var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
//     // console.log('last', lastVisible)
//     // Construct a new query starting at this document,
//     return (next = db
//       .collection('archive')
//       .orderBy('archiveCreatedAt', 'desc')
//       .startAfter(lastVisible)
//       .limit(5))
//   })
// }

// paginate()
// console.log(next)

exports.getArchives = (req, res) => {
  // console.log(req.body)
  let limit
  db.collection('albums')
    .where('activePoll', '==', true)
    .get()
    .then(query => {
      limit = query.docs.length
      return limit
    })
    .then(limit => {
      // console.log(limit)
      if (req.body.direction === 'all') {
        db.collection('archive')
          .orderBy('archiveCreatedAt', 'desc')
          .get()
          .then(data => {
            let archiveList = []
            data.forEach(doc => {
              archiveList.push({
                albumId: doc.data().albumId,
                albumName: doc.data().albumName,
                archiveCreatedAt: doc.data().archiveCreatedAt,
                archiveId: doc.data().archiveId,
              })
            })
            return res.json(archiveList)
          })
          .catch(err => console.error(err))
      } else {
        // console.log(limit)
        db.collection('archive')
          .orderBy('archiveCreatedAt', 'desc')
          .limit(limit * 3)
          .get()
          .then(data => {
            let archiveList = []
            data.forEach(doc => {
              archiveList.push({
                albumId: doc.data().albumId,
                albumName: doc.data().albumName,
                archiveCreatedAt: doc.data().archiveCreatedAt,
                archiveId: doc.data().archiveId,
              })
            })
            return res.json(archiveList)
          })
          .catch(err => console.error(err))
      }
    })
}

// exports.loadMoreArchives = (req, res) => {
//   next
//     .get()
//     .then(data => {
//       let archiveList = []
//       data.forEach(doc => {
//         archiveList.push({
//           albumId: doc.data().albumId,
//           albumName: doc.data().albumName,
//           archiveCreatedAt: doc.data().archiveCreatedAt,
//           archiveId: doc.data().archiveId,
//         })
//       })
//       return res.json(archiveList)
//     })
//     .catch(err => console.error(err))
// }

exports.getOneArchiveEntry = (req, res) => {
  console.log(req.params.archiveId)
  db.collection(`archive/${req.params.archiveId}/tracks`)
    .orderBy('trackListing')
    .where('alive', '==', true)
    .get()
    .then(data => {
      trackData = []
      data.forEach(doc => {
        trackData.push((track = doc.data()))
        console.log(doc.data())
      })
      return res.json(trackData)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

// exports.archiveTest = (req, res) => {
//   //get albums to archive
//   db.collection('albums')
//     .where('activePoll', '==', true)
//     .orderBy('createdAt')
//     .get()
//     .then(data => {
//       let activeAlbumList = []
//       data.forEach(doc => {
//         activeAlbumList.push((albumData = doc.data()))
//       })
//       activeAlbumList.forEach(album => {
//         albumArchive = {
//           albumName: album.albumName,
//           albumId: album.albumId,
//           archiveCreatedAt: new Date().getTime(),
//           archiveId: '',
//         }
//         console.log(albumArchive)
//         db.collection('archive')
//           .add(albumArchive)
//           .then(doc => {
//             let archiveId = doc.id
//             doc.update({
//               archiveId: doc.id,
//             })
//             return archiveId
//           })
//           .then(archiveId => {
//             db.collection(`albums/${album.albumId}/tracks`)
//               .orderBy('trackListing')
//               .get()
//               .then(data => {
//                 data.forEach(doc => {
//                   archiveTrack = {
//                     name: doc.data().name,
//                     votes: doc.data().votes,
//                     trackId: doc.data().trackId,
//                     trackListing: doc.data().trackListing,
//                     alive: doc.data().alive,
//                   }
//                   db.collection(`archive/${archiveId}/tracks`).add(archiveTrack)
//                 })
//               })
//           })
//       })
//     })
//   return res.json({ message: 'archive created' })
// }
