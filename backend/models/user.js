const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    followers: [Object],
    following: [Object],
    notifications: [Object],
    postsSaved: [Object],
    date_register: {
        type: Date,
        default: Date.now()
    },
    password: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        default: 'https://image.freepik.com/vector-gratis/avatar-cara-monstruo-dibujos-animados-monstruo-halloween_6996-1164.jpg'
    },
    biography: {
        type: String,
        default: 'Hey, I am a new Dreaming user!'
    },
    website: String,
    email: {
        type: String,
        trim: true,
        lowercase: true
    }
})

const User = mongoose.model('dreaming_users', userSchema)

module.exports = { User }
