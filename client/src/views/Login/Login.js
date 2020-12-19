import { useContext, useEffect } from 'react'
import { DreamingContext } from '../../context/DreamingContext'
import { Link, Redirect } from 'react-router-dom'

import Form from './Form'
import loginImage from '../../assets/imgs/post/2.jpg'

const Login = () => {

    const dreamingContext = useContext(DreamingContext)
    const { layoutLogin, loggin, resetRedirectSignUpSuccess, layoutRegister } = dreamingContext

    const { loading, errorMsg, redirectUserLoginSuccess, errorMsgComponent } = layoutLogin
    const { redirectUserCreatedSuccess } = layoutRegister

    useEffect(() => {
        if(redirectUserCreatedSuccess) {
            resetRedirectSignUpSuccess()
        }
    },[resetRedirectSignUpSuccess, redirectUserCreatedSuccess])

    if(redirectUserLoginSuccess) {
        return <Redirect to="/" />
    }

    return ( 
        <main className="sign-in-wrapper">
            <section className="wrapper-components-login">
                <section className="image-sign-in">
                    <img src={loginImage} alt="Login imagen Dreaming" />
                </section>
                <section className="form-sign-in">
                    <div className="login-form-sign-in">
                        <h1>dreaming</h1>
                        <Form 
                            loggin={loggin}
                        />
                        {/* <a href="#">¿Olvidaste tu contraseña?</a> */}
        
                        {(errorMsgComponent) ? <div className="alert-msg-login"><span>{errorMsg}</span></div> : null}
                        {(loading) ? <div className="lds-dual-ring-login"></div> : null}
                    </div>
                    <div className="go-to-sign-up">
                        <span>¿No tienes cuenta? <Link to="/register">Regístrate</Link></span>
                    </div>
                </section>
            </section>
        </main>
     );
}
 
export default Login;
