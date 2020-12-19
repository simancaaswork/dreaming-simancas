import { useState } from 'react'

const Form = ({ setPreviewImage, previewImage, user, uploadPost }) => {

    const [ post, setPost ] = useState({
        image: null,
        creator_id: user._id,
        caption: '',
        post_permission: {
            allow_comments: true,
            allow_likes: true
        }
    })

    const [ alertUploadAnImage, setAlertUploadAnImage ] = useState(false)

    const { allow_comments, allow_likes } = post.post_permission

    function handleUploadingImage(e) {
        if(e.target.files[0]) {
            setPreviewImage({
                ...previewImage,
                image: URL.createObjectURL(e.target.files[0])
            })
            setPost({
                ...post,
                image: e.target.files[0]
            })
        }
    }

    function handleAllowLikes() {
        setPost({
            ...post,
            post_permission: {
                allow_likes: (allow_likes) ? false : true,
                allow_comments
            }
        })

        setPreviewImage({
            ...previewImage,
            showLikes: !(allow_likes) ? true : false
        })
    }

    function handleAllowComments() {
        setPost({
            ...post,
            post_permission: {
                allow_comments: (allow_comments) ? false : true,
                allow_likes
            }
        })

        setPreviewImage({
            ...previewImage,
            showComments: !(allow_comments) ? true : false
        })
    }

    function handleUploadingPost() {

        if(post.image === null) {
            setAlertUploadAnImage(true)
            return;
        }

        setAlertUploadAnImage(false)
        uploadPost(post)
    }

    function handleCaption(e) {
        setPost({ ...post, caption: e.target.value})
        setPreviewImage({ ...previewImage, captionPreview: e.target.value})
    }

    return ( 
        <div className="form-section-upload-image">
            <div className="upload-image-form">
                <label htmlFor="upload_image">Sube tu imagen</label>
                <input type="file" 
                    id="upload_image" 
                    onChange={e => handleUploadingImage(e)}
                />
            </div>
            <div className="component-text-react">
                <textarea id="" cols="30" rows="10" 
                    placeholder="Habla sobre la imagen..."
                    required
                    onChange={(e) => handleCaption(e)}
                ></textarea>
            </div>
            <div className="configuration-post-aaction">
                <h5>Que acciones pueden hacer los usuarios</h5>
                <div className="option-configuration">
                    <label for="likes-confing">Permitir me gustas</label>
                    <div className="btn-container"
                        onClick={() => handleAllowLikes()}
                    >
                        <div className="red-side-btn"></div>
                        <div className="green-btn-side"></div>
                        <div className={`btn-dinamic ${(allow_likes) ? '' : 'off'}`}></div>
                    </div>
                </div>
                <div className="option-configuration">
                    <label htmlFor="comments-confing">Permitir comentarios</label>
                    <div className="btn-container"
                        onClick={() => handleAllowComments()}
                    >
                        <div className="red-side-btn"></div>
                        <div className="green-btn-side"></div>
                        <div className={`btn-dinamic ${(allow_comments) ? '' : 'off'}`}></div>
                    </div>
                </div>
            </div>
            <button
                onClick={() => handleUploadingPost()}
            >Publicar post</button>

            {(alertUploadAnImage) ? <div className="alert-error-upload"><span>Debes subir al menos una imagen</span></div> : null }            
        </div>
     );
}
 
export default Form;
