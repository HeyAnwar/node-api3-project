const User = require('../users/users-model')

function logger(req, res, next) {
  const date = new Date();
  console.log(`
    REQUEST METHOD: ${req.method}
    REQUEST URL: ${req.originalUrl}
    TIMESTAMP: ${date.toLocaleString()}
  `);
  next()
}

const validateUserId = async (req, res, next) => {
  try {
    const userId = await User.getById(req.params.id)
    if (!userId) {
      res.status(404).json({
        message: `user not found`
      })
    } else {
      res.json(userId)
    }
  }
  catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  const { text } = req.body
  if(!text || !text.trim()) {
    res.status(400).json({
      message: 'missing required name field'
    })
  } else {
    req.name = text.trim()
    next()
  }
}

const validatePost = async (req, res, next) => {
  try {
    const post = await User.insert(req)
  }
  catch (err) {
    next(err)
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}