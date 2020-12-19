const bcrypt = require('bcrypt')
const { User } = require('../models/user')

exports.createUser = async (req, res) => {
    
    const { password, username, email } = req.body
    
    const user_exists_by_email = await User.findOne({ email })

    if(user_exists_by_email) {
        res.status(400).json({ msg: 'El correo ya ha sido tomado!'})
        return
    }

    const user_exists_by_username = await User.findOne({ username })
    
    if(user_exists_by_username) {
        res.status(400).json({ msg: 'El usuario ya ha sido tomado! Elige otro'})
        return
    }

    try {
        const saltRounds = 10;
        const password_encrypted = await bcrypt.hash(password, saltRounds)
        req.body.password = password_encrypted

        const new_user = new User(req.body)
        await new_user.save()

        res.status(200).json({ msg: 'Usuario created!', new_user })
        
    } catch (error) {
        console.log(error)
    }
}
