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

const validateUser = async (req, res, next) => {
  try {
    const user = await User.insert(req.params.name)
    if(!user) {
      res.status(400).json({
        message: 'missing required name field'
      })
    } else {
      res.json(user)
    }
  }
  catch (err) {
    next(err)
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