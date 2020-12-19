const bcrypt = require('bcrypt')
const { User } = require('../models/user')

exports.loggingUser = async (req, res) => {
    const { username, password } = req.body

    const user_exists = await User.findOne({ username })

    if(user_exists) {
        const verify_password = await bcrypt.compare(password, user_exists.password)

        if(verify_password) {
            res.status(200).json({ msg: 'Bienvenido!', user_exists })
            
        } else {
            res.status(400).json({ msg: 'Contraseña incorrecta'})
        }

    } else {
        res.status(404).json({ msg: 'Usuario no encontrado'})
    }
}
