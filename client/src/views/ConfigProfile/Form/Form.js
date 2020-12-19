import { useState } from 'react'

const Form = ({ userAlreadyExists, user, updateProfile }) => {

    const { avatar, name, username, biography, email } = user 

    const [ userNewInfo, setUserNewInfo ] = useState(user)
    const [ newImagePreview, setNewImagePreview ] = useState(null)

    function handleNewInfoUser(e) {
        setUserNewInfo({
            ...userNewInfo,
            [e.target.name]: e.target.value
        })
    }

    function handleChangeNewImage(e) {
        if(e.target.files[0]) {
            setNewImagePreview(URL.createObjectURL(e.target.files[0]))
            setUserNewInfo({
                ...userNewInfo,
                avatar: e.target.files[0]
            })
        }  
    }

    function handleUploadImage(e) {
        e.preventDefault()
        updateProfile(userNewInfo)
    }

    return ( 
        <form
            onSubmit={handleUploadImage}
        >
            <div className="change-info-user-img-config">
                <img src={(newImagePreview) ? newImagePreview : avatar} alt="" />
                <div className="change-form-photo">
                    <h4>{username}</h4>
                    <input type="file" 
                        name="image" 
                        id="img_changing" 
                        onChange={handleChangeNewImage}
                    />
                    <label htmlFor="img_changing">Cambiar foto del perfil</label>
                </div>
            </div>
            <div className="change-info-user-config">
                <h5>Nombre</h5>
                <div className="input-form-change-name">
                    <input type="text" 
                        name="name" 
                        defaultValue={name} 
                        onChange={handleNewInfoUser}
                    />
                    <p>Para ayudar a que las personas descubran tu cuenta, usa el nombre por el que te conoce la gente, ya sea tu nombre completo, apodo o nombre comercial.</p>
                </div>
            </div>
            <div className="change-info-user-config">
                <h5>Nombre de usuario</h5>
                <div className="input-form-change-name">
                    <input type="text" 
                        name="username" 
                        defaultValue={username} 
                        onChange={handleNewInfoUser}
                    />
                    {(userAlreadyExists) ? <div className="alert-userd-exists"><span>Usuario en uso. Intenta con otro</span></div> : null}
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis delectus repellendus eius. Tempore, necessitatibus reprehenderit?.</p>
                </div>
            </div>
            <div className="change-info-user-config">
                <h5>Presentación</h5>
                <div className="input-form-change-name">
                    <input type="text" 
                        name="biography" 
                        defaultValue={biography} 
                        onChange={handleNewInfoUser}
                    />
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum aliquid natus maxime tempore. Reprehenderit beatae tempora magnam rerum consequatur, facilis est impedit adipisci necessitatibus hic!</p>
                </div>
            </div>
            <div className="change-info-user-config">
                <h5>Correo electrónico</h5>
                <div className="input-form-change-name">
                    <input type="email" 
                        name="email" 
                        defaultValue={email} 
                        onChange={handleNewInfoUser}
                    />
                </div>
            </div>
            <div className="config-footer-form-config">
                <button
                    type="submit"
                >Enviar</button>
            </div>
        </form>
     );
}
 
export default Form;
