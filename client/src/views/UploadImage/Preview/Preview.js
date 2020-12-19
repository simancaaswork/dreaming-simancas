import imageDefault from '../../../assets/imgs/post/2.jpg'

const Preview = ({ previewImage, user }) => {

    const { avatar, username } = user
    const { image, showComments, showLikes, captionPreview } = previewImage

    return ( 
        <div className="preview-image-upload">
            <div className="alert-msg-preview">
                <span>Podrás tener una vista preliminar de tu post!</span>
            </div>
            <div className="preview-image-show">
                <div className="head-preview-image">
                    <img src={avatar} alt="" />
                    <div className="info-about-user-preview">
                        <a href="#!">{username}</a>
                        <span>Hace unos minutos</span>
                    </div>
                </div>
                <div className="body-image-preview">
                    <img src={(image) ? image : imageDefault} alt="" />
                </div>
                <div className="principal-options-preview">
                    <div className="wrapper-options-preview">
                        <div className="btn-principal-preview">
                            {(!showLikes) ? null : <i className="fas fa-heart"></i>}
                            {(!showComments) ? null : <i className="far fa-comment-alt"></i>}                            
                        </div>
                        <i className="far fa-bookmark"></i>
                    </div>

                    {!(showLikes) ? null :
                        <div className="post-liked-info-preview">
                            <span>Les gusta a magdalein_picon y <strong>28 personas más</strong></span>
                        </div>
                    }

                    <div className="user-text-description-preview">
                        <span>simancasart</span>
                        <div className="description-box-preview">
                            {(captionPreview === '') ? <p>Escribe el mensaje de tu post y observalo aquí.</p> : <p>{captionPreview}</p>}
                        </div>
                    </div>

                    {!(showComments) ? null :
                        <div className="post-comments-box-preview">
                            <div className="comment-post-box-preview">
                                <p><a href="#!">gatomaga</a> Lorem ipsum dolor sit amet.</p>
                                <i className="far fa-heart"></i>
                            </div>
                            <div className="comment-post-box-preview">
                                <p><a href="#!">simancasart</a> Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis sint excepturi obcaecati delectus? Doloribus, consequuntur.</p>
                                <i className="fas fa-heart"></i>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
     );
}
 
export default Preview;
