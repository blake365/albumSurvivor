const { db } = require('../util/admin')

// exports.archiveTest = (req, res) => {
//   const newArchive = {
//     createdAt: new Date().toISOString(),
//     archiveId: '',
//   }
//   let masterList = []
//   db.collection('albums')
//     .where('activePoll', '==', true)
//     .orderBy('createdAt')
//     .get()
//     .then(data => {
//       let activeAlbumList = []
//       data.forEach(doc => {
//         activeAlbumList.push((albumData = doc.data().albumId))
//       })
//       return activeAlbumList
//     })
//     .then(activeAlbumList => {
//       console.log({ activeAlbumList })
//       activeAlbumList.forEach(albumId => {
//         db.collection(`albums/${albumId}/tracks`)
//           .orderBy('trackListing')
//           .get()
//           .then(data => {
//             let trackData = []
//             data.forEach(doc => {
//               trackData.push((track = doc.data()))
//             })
//             return trackData
//           })
//           .then(trackData => {
//             masterList.push(trackData)
//           })
//         // return masterList
//       })
//       return res.json({ masterList })
//     })

//     .catch(err => console.error(err))
// }

exports.archiveTest = (req, res) => {
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
                  db.collection(`archive/${archiveId}/tracks`).add(archiveTrack)
                })
              })
          })
      })
    })
  return res.json({ message: 'archive created' })
}
