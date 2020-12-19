import { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { DreamingContext } from '../../context/DreamingContext'

import Form from './Form'
import Preview from './Preview'
import AlertUploading from './AlertUploading'

const UploadImage = () => {

    const dreamingContext = useContext(DreamingContext)
    const { layoutUploadImage, userOnline:user, uploadPost } = dreamingContext

    const { alertUploadingImage, redirectUploadSuccess } = layoutUploadImage

    const [ previewImage, setPreviewImage ] = useState({
        image: null,
        showComments: true,
        showLikes: true,
        captionPreview: ''
    })

    if(redirectUploadSuccess) {
        return <Redirect to="/" />
    }

    return ( 
        <>
            <main className="upload-image-wrapper">
                <Form 
                    setPreviewImage={setPreviewImage}
                    previewImage={previewImage}
                    user={user}
                    uploadPost={uploadPost}
                />
                <Preview 
                    user={user}
                    previewImage={previewImage}
                />
            </main>
            
            {(alertUploadingImage) ? <AlertUploading /> : null }
        </>
     );
}
 
export default UploadImage;
