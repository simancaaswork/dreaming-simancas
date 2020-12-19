const router = require('express').Router()
const register = require('../controllers/register')

router.post('/create/user', register.createUser)

module.exports = router;
