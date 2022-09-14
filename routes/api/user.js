const express = require('express');
const router = express.Router();
const userController=require('../../controllers/userController')

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.register)

    router.route('/login')
    .post(userController.loginUser)

module.exports = router