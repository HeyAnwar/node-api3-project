const User = require('../users/users-model')

function logger(req, res, next) {
  console.log('hello from logger')
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
      next()
    }
  }
  catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}