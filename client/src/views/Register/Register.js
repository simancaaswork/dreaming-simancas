import { useContext, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { DreamingContext } from '../../context/DreamingContext'

import Form from './Form'

const Register = () => {

    const dreamingContext = useContext(DreamingContext)
    const { layoutRegister, signUp, resetLoginError, layoutLogin } = dreamingContext

    const { errorMsg, loading, errorMsgComponent, redirectUserCreatedSuccess } = layoutRegister
    const { errorMsgComponent:errorLoginMsg } = layoutLogin

    useEffect(() => {
        if(errorLoginMsg) {
            resetLoginError()
        }
    },[resetLoginError, errorLoginMsg])

    if(redirectUserCreatedSuccess) {
        return <Redirect to="/login" />
    }
    
    return ( 
        <main className="sign-up-wrapper">
            <div className="section-register-form">
                <div className="head-sign-up">
                    <h1>dreaming</h1>
                    <h2>Regístrate para ver fotos y seguir a tus amigos.</h2>
                </div>
        
                <Form 
                    signUp={signUp}
                />
                {(loading) ? <div className="lds-dual-ring-login"></div> : null}
                {(errorMsgComponent) ? <div className="alert-error-msg"><span>{errorMsg}</span></div> : null}
            </div>
            <div className="go-to-login-redirection">
                <span>¿Tienes una cuenta? <Link to='/login'>Inicia sesión</Link></span>
            </div>
        </main>
     );
}
 
export default Register;
