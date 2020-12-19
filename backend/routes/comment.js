const router = require('express').Router()
const comment = require('../controllers/comment')

router.post('/add', comment.addCommentToPost)

module.exports = router;
