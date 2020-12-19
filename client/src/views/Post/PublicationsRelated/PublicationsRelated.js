import { Link } from "react-router-dom";

const PublicationsRelated = ({ postsRelated, username }) => {
    return ( 
        <section className="more-post-about-user">
            <div className="head-more-posts">
                <h5>Más publicaciones de <Link to={`/${username}`}>{username}</Link></h5>
            </div>
            <div className="grid-more-posts-user-wrapper">
                {postsRelated.slice(0, 6).map((post) => {

                    const { image, comments, likes, _id } = post
                    return (
                        <div className="post-about-user"
                            key={_id}
                        >
                            <Link to={`/${username}/post/${_id}`}>
                                <img src={image} alt="" />
                                <div className="info-about-post-user">
                                    <span><i className="fas fa-heart"></i> {likes.length}</span>
                                    <span><i className="fas fa-comment-alt"></i> {comments.length}</span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </section>
     );
}
 
export default PublicationsRelated;
