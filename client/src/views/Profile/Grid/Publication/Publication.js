import { Link } from 'react-router-dom'
const Publication = ({ post }) => {

    const { image, comments, likes, username, _id } = post
    return ( 
        <div className="publication-post-card">
            <Link to={`/${username}/post/${_id}`}>
                <img src={image} alt="" />
                <div className="info-about-post">
                    <div className="likes-comment-counter">
                        <span><i className="fas fa-heart"></i> {likes.length}</span>
                        <span><i className="fas fa-comment-alt"></i> {comments.length}</span>
                    </div>
                </div>
            </Link>
        </div>
     );
}
 
export default Publication;