const express = require('express')
const usersRoute = require('./users/users-router')

const router = express.Router()


router.use(express.json())
router.use('/', usersRoute)  // for login and registration

module.exports = router