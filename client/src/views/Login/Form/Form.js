import { useState } from 'react'

const Form = ({ loggin }) => {

    const [ user, setUser ] = useState({
        username: '',
        password: ''
    })

    function handleUserInfo(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function sendInformationToSignIn(e) {
        e.preventDefault()
        loggin(user)
    }

    return ( 
        <form
            onSubmit={e => sendInformationToSignIn(e)}
        >
            <input type="text" 
                required 
                name="username" 
                placeholder="Usuario" 
                autoFocus
                onChange={e => handleUserInfo(e)}
            />
            <input type="password" 
                required 
                name="password" 
                placeholder="Contraseña" 
                onChange={e => handleUserInfo(e)}
            />
            <button type="submit">Iniciar sesión</button>
        </form>
     );
}
 
export default Form;
