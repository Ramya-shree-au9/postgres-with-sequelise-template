const {
    User,
    validateUser,
  } = require('../models/userModel')

exports.createUser = async (req, res, next) => {
    // req.body.userId = req.user.id
    console.log('hj',req.body)
    const { error } = validateUser(req.body)
    if (error) {
        res.status(400).json({status:'fail'})
      console.log(error)
    }
    // req.body.sfApplicationId = null
    const user = await User.create(req.body)
  
    res.status(201).json({
      status: 'success',
      user,
    })
  }