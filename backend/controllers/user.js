const { v4: uuidv4 } = require('uuid')
const { User } = require('../models/user')
const { Post } = require('../models/post')

exports.followUser = async (req, res) => {
    try {
        const { followerUser, followingUser } = req.body

        const { _id } = followerUser
        const { _id:id_following_user } = followingUser

        const userFollowed = await User.findById(_id)
        const { followers } = userFollowed
        let checkIfAlreadyFollowed = followers.filter(follower => follower._id === id_following_user)
        if(checkIfAlreadyFollowed.length > 0) {
            return res.status(400).json({ msg: 'Ya sigues a este usuario'})
        } else {

            const userFollowing = await User.findById(id_following_user)
    
            userFollowed.followers.push(followingUser)
            userFollowing.following.push(followerUser)

            let notification = {
                user: followingUser,
                type: 'followed',
                date_notification: Date.now(),
                id_notification: uuidv4(),
                readed: false
            }
            userFollowed.notifications.push(notification)
    
            await User.findByIdAndUpdate(_id, userFollowed, {})
            await User.findByIdAndUpdate(id_following_user, userFollowing, {})
    
            res.status(200).json({ msg: `Acabas de seguir a ${followerUser.name}`})
        }

    } catch (error) {
        console.log(error)
    }
}

exports.unfollowUser = async (req, res) => {
    const { _id:id_to_remove_Follower, userOnlineToModifidy } = req.body
    const { _id } = userOnlineToModifidy
    

    try {
        await User.findByIdAndUpdate(_id, userOnlineToModifidy, {})
        let userToRemoveFollower = await User.findById(id_to_remove_Follower)
        
        const { followers } = userToRemoveFollower
        let followersUpdated = followers.filter((user) => user._id !== _id)
        userToRemoveFollower.followers = followersUpdated

        await User.findByIdAndUpdate(id_to_remove_Follower, userToRemoveFollower, {})

        res.status(200).json({ msg: 'Unfollow completed!', userToRemoveFollower  })
        
    } catch (error) {
        console.log(error)
    }
}

exports.updatingProfile = async (req, res) => {
    const { _id } = req.body
    
    const user_in_database = await User.findById(_id)

    if(user_in_database) {
        try {
            const user = await User.findByIdAndUpdate(_id, req.body, {})
            const { _id:id_user_updated } = user
            
            const user_updated = await User.findById(id_user_updated)
            res.status(200).json({ msg: 'User profile updated!', user_updated })

        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: 'Error updating profile'})
        }
        
    } else {
        res.status(404).json({ msg: 'User not found!'})
    }
}

exports.getSuggestListUsers = async (req, res) => {
    try {

        const { user } = req.params

        const users = await User.find()
        let users_suggest = []

        for(let i = 0; i < users.length ; i++) {
            if(users[i].username !== user) {
                users_suggest.push(users[i])
            }
        }

        if(users_suggest.length > 0) {
            res.status(200).json({ users_suggest })
        }
        
    } catch (error) {
        console.log(error)
        console.log('ERROR getting suggest lists users!')

    }
}

exports.getInformationUser = async (req, res) => {
    const { user } = req.params

    try {

        const user_exists = await User.findOne({ username: user })
        const { _id } = user_exists
        const postsByUser = await Post.find({ creator_id: _id })
        
        res.status(200).json({ user_exists, postsByUser })
        
    } catch (error) {
        console.log(error)
    }
}

exports.updateNotificationStatus = async (req, res) => {
    const { id } = req.params
    try {
        let user = await User.findById(id)
        let { notifications } = user 
        for(let i = 0; i < notifications.length; i++) {
            notifications[i].readed = true
        }
        await User.findByIdAndUpdate(id, user, {})
        res.status(200).json({ user })
        
    } catch (error) {
        console.log(error);
    }
}
