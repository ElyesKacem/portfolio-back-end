const express = require('express');
const router = express.Router();
const userController=require('../../controllers/userController')

router.route('/register')
    .post(userController.register)

// update post and user



module.exports = router