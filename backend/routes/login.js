const router = require('express').Router()
const login = require('../controllers/login')

router.post('/', login.loggingUser)


module.exports = router;