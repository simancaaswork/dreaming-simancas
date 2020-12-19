import { Link } from 'react-router-dom'

const Notifications = ({ userOnline, setShowPanel, showPanel }) => {

    const { notifications } = userOnline

    return ( 
        <div className="float-notification-box"
            onMouseLeave={() => setShowPanel({ ...showPanel, notifications: false })}
        >
            {(notifications.length === 0) ? <NotNotificationsYet /> :
                notifications.map((notification) => {
                    const { type } = notification

                    if(type === 'comment on post') return <CommentNotification notification={notification} />
                    if(type === 'like on post') return <LikeNotification notification={notification} />
                    if(type === 'followed') return <FollowedNotification notification={notification} />
                })  
            }  
        </div>
     );
}

const LikeNotification = ({notification}) => {
    const { user, post, id_notification } = notification

    return (
        <Link to={`/${post.username}/post/${post._id}`} className="notification-heart"
            key={id_notification}
        >
            <img src={user.avatar} alt="" className="img-user" />
            <div className="body-notification">
                <span>A <strong>{user.username}</strong> le gustó tu foto</span>
            </div>
            <img src={post.image} alt="" className="img-notification" />
        </Link>
    )
}

const CommentNotification = ({notification}) => {
    const { comment_text, id_notification, user, post } = notification
    return (
        <Link to={`/${post.username}/post/${post._id}`} className="notification-comment"
            key={id_notification}
        >
            <img src={user.avatar} alt="" className="img-user" />
            <div className="body-notification">
                <span className="msg-notification"><strong>{user.username}</strong> te hizo un comentario</span>
                <span className="info-notification">{comment_text}</span>
            </div>
            <img src={post.image} alt="" className="img-notification" />
        </Link>
    )
}

const FollowedNotification = ({ notification }) => {
    const { user, id_notification } = notification

    return (
        <Link to={`/${user.username}`} className="notification-follow"
            key={id_notification}
        >
            <img src={user.avatar} alt="" className="img-user" />
            <div className="body-notification">
                <h5>{user.username}</h5>
                <span>comenzó a seguirte</span>
            </div>
        </Link>
    )
}

const NotNotificationsYet = () => {
    return ( 
        <div className="no-notifications-yet">
            <h2>No hay notificaciones</h2>
            <span>Cuando las personas interactuen contigo veras todo acá</span>
        </div>
     );
}
 
 
export default Notifications;
