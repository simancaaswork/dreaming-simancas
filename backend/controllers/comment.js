const { v4: uuidv4 } = require('uuid')
const { Post } = require('../models/post')
const { User } = require('../models/user')

exports.addCommentToPost = async (req, res) => {
    const { comment_text, post_id, user } = req.body

    const { _id:user_id } = user

    let post = await Post.findById(post_id)
    const { creator_id } = post

    let userPost = await User.findById(creator_id)

    if(JSON.stringify(user_id) !== JSON.stringify(creator_id)) {
        let notification = {
            user,
            type: 'comment on post',
            post,
            date_notification: Date.now(),
            comment_text,
            id_notification: uuidv4(),
            readed: false
        }
    
        userPost.notifications.push(notification)
        const { _id } = userPost
        await User.findByIdAndUpdate(_id, userPost, {})
    } 

    if(post) {
        const { avatar, _id, name, username } = user
        let comment = {
            _id: uuidv4(),
            comment_text,
            user_comment: {
                avatar,
                _id,
                name,
                username
            }
        }

        post.comments.push(comment)

        await Post.findByIdAndUpdate(post_id, post)

        let comment_added = {
            post_id,
            comment
        }
        res.status(200).json({ comment_added })
        
    }
}
