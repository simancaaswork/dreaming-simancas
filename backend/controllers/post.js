const { Post } = require('../models/post')
const { User } = require('../models/user')
const { v4: uuidv4 } = require('uuid')

exports.getPost = async (req, res) => {
    try {
        const posts = await Post.find().sort([['created_date', '-1']])
        res.status(200).json({ posts })
        
    } catch (error) {
        console.log(error)
        console.log('ERROR getting all posts!')
        res.status(400).json({ msg: 'Error getting posts!'})
    }
}

exports.getMyPosts = async (req, res) => {
    try {
        const { id } = req.params

        const posts = await Post.find({ creator_id: id }).sort([['created_date', '-1']])
        if(posts) {
            res.status(200).json({ posts })
        
        } else {
            res.status(404).json({ msg: 'No tienes posts, todavía' })
        }
        
        
    } catch (error) {
        console.log(error)
        console.log('ERROR getting my posts!')
    }
}

exports.createPost = async (req, res) => { 
    try {
        const { creator_id } = req.body
        const user_exists = await User.findById(creator_id)

        if(user_exists) {
            const { username, avatar } = user_exists
            req.body.username = username
            req.body.avatar_creator = avatar
            req.body.created_date = Date.now()

            const new_post = new Post(req.body)
            const post_to_sent = await new_post.save()
            console.log('new post saved!')

            res.status(200).json({ msg: 'Post created success!', post_to_sent })
        }

    } catch (error) {
        console.log(error)
        console.log('ERROR creating a new post!')
    }
}

exports.getPostSolo = async (req, res) => {
    const { id } = req.params
    try {
        let post = await Post.findById(id)
        const { creator_id } = post
        const user = await User.findById(creator_id)
        const postsRelated = await Post.find({ creator_id }).sort([['created_date', '-1']])
        
        const postAlone = {
            post,
            user,
            postsRelated
        }

        res.status(200).json({ postAlone })
        
    } catch (error) {
        console.log(error)
    }
}


exports.likePostUpdate = async (req, res) => {
    try {
        const { post_id, userLikedPost } = req.body
        const { _id } = userLikedPost
        let post = await Post.findById(post_id)

        const { likes, creator_id } = post

        if(likes.length > 0) {

            function checkIfAlreadyLikePost() {
                let checked = likes.filter(user => user._id === _id)
                if(checked.length > 0) {
                    return true
                } else {
                    return false
                }
            }

            let checkAlreadyLiked = checkIfAlreadyLikePost()

            if(checkAlreadyLiked) {
                res.status(400).json({ msg: 'Ya has dado like!'})
                return;
            } else {
                try {
                    post.likes.push(userLikedPost)
                    await Post.findByIdAndUpdate(post_id, post, {})
                    res.status(200).json({ msg: 'Liked!' })
                    addNotificationToUser()
    
                    return;
                    
                } catch (error) {
                    console.log(error);
                }
            }
        }
        
        post.likes.push(userLikedPost)        
        await Post.findByIdAndUpdate(post_id, post, {})
        res.status(200).json({ msg: 'Liked!' })
        addNotificationToUser()


        async function addNotificationToUser() {
            if(JSON.stringify(_id) !== JSON.stringify(creator_id)) {
                let userCreatorOfPost = await User.findById(creator_id)
                let { notifications } = userCreatorOfPost
                let notification = {
                    user: userLikedPost,
                    type: 'like on post',
                    post,
                    date_notification: Date.now(),
                    id_notification: uuidv4(),
                    readed: false
                }

                notifications.push(notification)
                userCreatorOfPost.notifications = notifications
                try {
                    await User.findByIdAndUpdate(creator_id, userCreatorOfPost, {})
                    
                } catch (error) {
                    console.log(error);
                }
            } 
        }
        
    } catch (error) {
        console.log(error)
    }
}

exports.unlikePostUpdate = async (req, res) => {
    const { post_id, userUnlikePost } = req.body
    try {

        const { _id:user_id } = userUnlikePost

        let post = await Post.findById(post_id)

        const { likes } = post
        
        const likesUpdated = likes.filter(like => like._id !== user_id)
        post.likes = likesUpdated

        await Post.findByIdAndUpdate(post_id, post, {})

        res.status(200).json({ msg: 'Ya no te gusta! ): '})
        
    } catch (error) {
        console.log(error)
    }
}
