const express = require('express')

const checkAuth = require('../middleware/check_auth')
const {
users_get_all,
users_delete_all,
users_delete_user,
users_get_user,
users_login_user,
users_signup_user,
users_update_user
} = require('../controller/user')
const router = express.Router()

// total get user
router.get('/', users_get_all)

// detail get user 
router.get('/:userId', checkAuth, users_get_user)

// sing up 
router.post('/signup', users_signup_user)

// login 
router.post('/login', users_login_user)

// update user 
router.patch('/:userId', checkAuth, users_update_user)

// total delete user
router.delete('/', users_delete_all)

// detail delete user 
router.delete('/:userId', checkAuth, users_delete_user)

module.exports = router