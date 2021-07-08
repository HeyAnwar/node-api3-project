const express = require('express');
const Post = require('../posts/posts-model')
const User = require('./users-model')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const { validateUserId } = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
  .then(found => {
    res.json(found)
  })
  .catch(err => {
    res.status(500).json({
        message: 'The posts information could not be retrieved',
        error: err.message,
    })
  })
});

router.get('/:id', validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const user = await User.getById(req.params.id)
    if(!user) {
      res.status(404).json({
        message: 'user not found'
      })
    } else {
      res.json(user)
    }
  }
  catch (err) {
    res.status(500).json({
      message: 'user not found'
    })
  }
  

});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router