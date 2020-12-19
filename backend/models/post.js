const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    creator_id: mongoose.SchemaTypes.ObjectId,
    username: String,
    avatar_creator: String,
    image: String,
    caption: String,
    created_date: {
        type: Date
    },
    comments: [Object],
    likes: [Object],
    post_permission: {
        allow_comments: Boolean,
        allow_likes: Boolean
    }
})

const Post = mongoose.model('dreaming_posts', postSchema)

module.exports = { Post }
