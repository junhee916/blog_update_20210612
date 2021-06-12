const express = require('express')

const checkAuth = require('../middleware/check_auth')
const {
commend_delete_all,
commend_delete_commend,
commend_update_commend,
commends_get_commend,
commends_post_commend
} = require('../controller/commend')
const router = express.Router()

// detail get commend
router.get('/:commendId', checkAuth, commends_get_commend)

// register commend
router.post('/', checkAuth, commends_post_commend)

// update commend
router.patch('/:commendId', checkAuth, commend_update_commend)

// total delete commend
router.delete('/', checkAuth, commend_delete_all)

// detail delete commend 
router.delete('/:commendId', checkAuth, commend_delete_commend)

module.exports = router