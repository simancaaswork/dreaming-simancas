import { useState } from 'react'

const ActionByUser = ({ likes, post_permission, username, unlikePost, commentPost, likePost, post, userOnline }) => {

    const { allow_comments, allow_likes } = post_permission
    const { _id } = post

    const [ comment, setComment ] = useState({
        comment_text: '',
        post_id: _id
    })

    const { _id:userOnline_id } = userOnline
    let checkIsAlreadyLikeThisPost = checkAlreadyLike()

    function checkAlreadyLike() {
        let checked = likes.filter(like => like._id === userOnline_id)
        if(checked.length > 0) {
            return true
        } else {
            return false
        }
    } 

    function handlePostComment(e) {
        e.preventDefault()
        if(comment.comment_text === '') {
            return;
        }

        commentPost(comment)
        setComment({ ...comment, comment_text: ''})
    }

    return ( 
        <div className="actions-by-users-section">
            <div className="btn-action-post-alone">
                <div className="principal-action-post">
                    {(allow_likes) ? 
                        (checkIsAlreadyLikeThisPost) ? 
                            <i className="fas fa-heart" style={{ color: 'red', cursor: 'pointer' }} onClick={() => unlikePost(_id)}></i>  
                            :
                            <i className="far fa-heart" style={{cursor: 'pointer'}} onClick={() => likePost(_id)}></i> 
                        : null
                    }
                    {(allow_comments) ? <label htmlFor="comment_box" style={{ cursor: 'pointer'}}><i className="far fa-comment-alt"></i></label> : null }                    
                </div>
            </div>
            <div className="people-who-liked-post">
                {(allow_likes) ? <span>Le ha gustado a {/*<strong>alelu_</strong> y*/} <strong>{likes.length} personas</strong></span> : <span><strong>{username}</strong> no permite likes en su post</span>}
            </div>
            <form
                onSubmit={e => handlePostComment(e)}
            >
                <textarea name="" 
                    value={comment.comment_text} 
                    cols="30" rows="10" 
                    id="comment_box" 
                    placeholder="Agrega un comentario..."
                    onChange={e => setComment({ ...comment, comment_text: e.target.value })}
                ></textarea>
                <button type="submit">Publicar</button>
            </form>
        </div>
     );
}
 
export default ActionByUser;
