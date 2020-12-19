const router = require('express').Router()
const user = require('../controllers/user')

router.post('/follow', user.followUser)
router.put('/unfollow', user.unfollowUser)
router.put('/edit', user.updatingProfile)
router.get('/suggest/users/:user', user.getSuggestListUsers)
router.get('/information/:user', user.getInformationUser)
router.put('/update/notification/status/:id', user.updateNotificationStatus)


module.exports = router;
