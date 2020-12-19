import { Link } from 'react-router-dom';

const Comments = ({ comments }) => {    
    return ( 
        <div className="comments-by-people">
            {comments.map((comment) => {
                const { comment_text, user_comment, _id } = comment
                const { avatar, username } = user_comment

                return (
                    <div className="comment-people-info"
                        key={_id}
                    >
                        <img src={avatar} alt="" />
                        <div className="comment-psoted-by-user">
                            <Link to={`/${username}`}>{username}</Link>
                            <p>{comment_text}</p>
                        </div>
                    </div>
                )
            })}
        </div>
     );
}
 
export default Comments;
