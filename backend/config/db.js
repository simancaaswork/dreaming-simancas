require('dotenv').config({ path: 'vars.env' })
const mongoose = require('mongoose')

async function connectDB() {
    try {

        await mongoose.connect(process.env.STRING_DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log('DB connected!')
        
    } catch (error) {
        console.log(error)
        console.log('DB error connection')
    }
}

module.exports = connectDB
