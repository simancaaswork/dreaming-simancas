import { useContext } from 'react'
import { DreamingContext } from '../../context/DreamingContext'

import Form from './Form'
import AlertSuccess from './AlertSuccess'
import AlertUpdating from './AlertUpdating'

const ConfigProfile = () => {

    const dreamingContext = useContext(DreamingContext)
    const { layoutConfigUser, userOnline:user, updateProfile } = dreamingContext

    const { success, updating, alertFillFields, userAlreadyExists } = layoutConfigUser

    return ( 
        <>
            <main className="config-profile-wrapper">
                <div className="content-config-profile">
                    <Form 
                        userAlreadyExists={userAlreadyExists}
                        user={user}
                        updateProfile={updateProfile}
                    />
                </div>

                {(alertFillFields) ? <div className="alert-error-config-msg"><span>Completa los campos necesarios</span></div> : null}
            </main>

            {(success) ? <AlertSuccess /> : null} 
            {(updating) ? <AlertUpdating /> : null}
        </>
     );
}
 
export default ConfigProfile;
