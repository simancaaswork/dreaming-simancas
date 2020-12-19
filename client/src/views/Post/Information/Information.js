import Description from './Description'
import Comments from './Comments'
import ActionByUser from './ActionByUser'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/es-mx'

const Information = ({ postSolo, unlikePost, commentPost, likePost, layoutComment, userOnline }) => {

    const { post, user } = postSolo
    const { avatar, username } = user
    const { post_permission, caption, comments, likes, created_date } = post
    const datePosted = moment(created_date).locale('es-mx').fromNow()

    return ( 
        <section className="info-post-image-wrapper">
            <div className="head-post-alone-wrapper">
                <img src={avatar} alt="" />
                <Link to={`/${username}`}>{username}</Link>
            </div>
            <div className="comment-section-post-alone">
                <Description 
                    caption={caption}
                    avatar={avatar}
                    datePosted={datePosted}
                    username={username}
                />
                <Comments 
                    comments={comments}
                />
                <ActionByUser 
                    post={post}
                    likes={likes}
                    layoutComment={layoutComment}
                    username={username}
                    post_permission={post_permission}
                    commentPost={commentPost}
                    likePost={likePost}
                    unlikePost={unlikePost}
                    userOnline={userOnline}
                />
            </div>
        </section>
     );
}
 
export default Information;
