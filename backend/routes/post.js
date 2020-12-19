const router = require('express').Router()
const post = require('../controllers/post')

router.get('/all', post.getPost)
router.get('/all/:id', post.getMyPosts)
router.get('/alone/:id', post.getPostSolo)
router.post('/create', post.createPost)
router.put('/like', post.likePostUpdate)
router.put('/unlike', post.unlikePostUpdate)

module.exports = router;
