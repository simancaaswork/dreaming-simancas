import { Link } from 'react-router-dom'

const Post = ({ post }) => {
    const { caption, image, username, avatar_creator, _id, likes, comments } = post
    return ( 
        <div className="post-created-by-user"
            key={_id}
        >
            <Link to={`/${username}/post/${_id}`}>
                <img src={image} alt={`Publicación de ${username}`} />
            </Link>
            <p>{caption}</p>
            <div className="info-about-post-created">
                <div className="info-post-created">
                    <span><i className="fas fa-heart"></i> {likes.length}</span>
                    <span><i className="fas fa-comment-alt"></i> {comments.length}</span>
                </div>
                <div className="user-owner-post-created">
                    <img src={avatar_creator} alt={`Foto de perfil de ${username}`} />
                    <Link to={`/${username}`}>{username}</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Post;
