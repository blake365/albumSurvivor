module.exports.checkAdminStatus = (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res
      .status(500)
      .json({ error: 'You do not have permission to do this' })
  } else {
    return next()
  }
}
