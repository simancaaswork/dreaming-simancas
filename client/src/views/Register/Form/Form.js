import { useState } from 'react'

const Form = ({ signUp }) => {

    const [ user, setUser ] = useState({
        email: '',
        name: '',
        password: '',
        username: ''
    }) 

    function handleInformationUser(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function sendInformationToSignUp(e) {
        e.preventDefault()
        signUp(user)
    }

    return ( 
        <form
            onSubmit={e => sendInformationToSignUp(e)}
        >
            <input type="email" 
                name="email" 
                autoFocus
                required
                placeholder="Correo electrónico"
                onChange={e => handleInformationUser(e)}
            />
            <input type="text" 
                name="name" 
                required
                placeholder="Nombre completo"
                onChange={e => handleInformationUser(e)}
            />
            <input type="text" 
                name="username" 
                required
                placeholder="Nombre de usuario"
                onChange={e => handleInformationUser(e)}
            />
            <input type="password" 
                name="password" 
                required
                placeholder="Contraseña"
                onChange={e => handleInformationUser(e)}
            />
            <button type="submit">Registrarte</button>
        </form>
     );
}
 
export default Form;
