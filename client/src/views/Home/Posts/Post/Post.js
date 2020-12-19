import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/es-mx'

import { DreamingContext } from '../../../../context/DreamingContext'

const Post = ({ post }) => {

    const dreamingContext = useContext(DreamingContext)
    const { commentPost, layoutComment, likePost, unlikePost, userOnline } = dreamingContext

    const { comments, likes, created_date, caption, image, username, post_permission, _id, avatar_creator } = post
    const { allow_comments, allow_likes } = post_permission
    const datePosted = moment(created_date).locale('es-mx').fromNow()

    const { _id:userOnline_id } = userOnline
    let checkIsAlreadyLikeThisPost = checkAlreadyLike()
    function checkAlreadyLike() {
        let checkedLiked = likes.filter(like => like._id === userOnline_id)
        if(checkedLiked.length > 0) {
            return true 
        } else {
            return false
        }
    } 

    const { uploadingComment } = layoutComment

    const [ comment, setComment ] = useState({
        comment_text: '',
        post_id: _id
    })

    function handlePostComment(e) {
        e.preventDefault()
        if(comment.comment_text === '') {
            return;
        }

        commentPost(comment)
        setComment({ ...comment, comment_text: ''})
    }
    
    return ( 
        <div className="post-card-principal">
            <div className="post-card-header">
                <Link to={`/${username}`}>
                    <img src={avatar_creator} alt="" />
                </Link>
                <div className="info-post-card">
                    <Link to={`/${username}`}>{username}</Link>
                    <span>{datePosted}</span>
                </div>
            </div>
            <div className="post-card-img">
                <img src={image} alt="" />
            </div>
            <div className="post-body-option-info">
                <div className="btn-option">
                    <div className="principal-btn-post">
                        {(allow_likes) ? 
                            (checkIsAlreadyLikeThisPost) ? 
                                <i className="fas fa-heart" style={{ color: 'red' }} onClick={() => unlikePost(_id)}></i>  
                                :
                                <i className="far fa-heart" onClick={() => likePost(_id)}></i> 
                            : null
                        }
                        {(allow_comments) ? <label htmlFor={`textbox_comment ${_id}`}><i className="far fa-comment-alt"></i></label> : null}
                    </div>                    
                </div>
                {!(allow_likes) ? null :
                    <div className="post-liked-info">
                        {(likes.length > 0) ? <span>Este post le ha gustado a <strong>{likes.length} personas más</strong></span> : <span>Este post aún no ha recibdo <strong>likes</strong></span> }
                    </div>
                }
                <div className="caption-post-home">
                    <strong>{username}</strong>
                    <p>{caption}</p>
                </div>
                <div className="post-comments-box">
                    {comments.map((comment) => {

                        const { comment_text, user_comment, _id } = comment
                        return (
                            <div className="comment-post-box"
                                key={_id}
                            >
                                <p><Link to={`/${user_comment.username}`}>{user_comment.username}</Link> {comment_text}</p>
                                {/* <i className="far fa-heart"></i> */}
                            </div>
                        )

                    })}
                </div>
                {!(allow_comments) ? null :
                    <form
                        onSubmit={e => handlePostComment(e)}
                    >
                        <textarea 
                            cols="30" 
                            rows="10" 
                            placeholder="Escribe un comentario..."
                            value={comment.comment_text}
                            id={`textbox_comment ${_id}`}
                            onChange={e => setComment({ ...comment, comment_text: e.target.value })}
                        ></textarea>
                        <button type="submit">Publicar</button>
                    </form>
                }
            </div>
            {(uploadingComment) ? <div className="lds-dual-ring-post-principal"></div> : null}
        </div>
     );
}
 
export default Post;
