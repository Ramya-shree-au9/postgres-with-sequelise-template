const router = require('express').Router()

const {
    createUser
  } = require('../controlers/userController')
  
  router.route('/signUp').post(createUser)


  module.exports = router