import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { DreamingContext } from '../../context/DreamingContext'

const Notifications = () => {
    const dreamingContext = useContext(DreamingContext)
    const { userOnline, readedNotification } = dreamingContext
    const { notifications } = userOnline

    useEffect(() => {
        readedNotification()
    }, [])

    return ( 
        <main className="wrappper-notifications-user">
            <div className="title-notifications-user">
                <h2>Últimas notificaciones</h2>
                <p>Esta al tanto de todo lo que los usuarios dicen de ti</p>
            </div>
            <div className="grid-notifications-user">
                {(notifications.length > 0) ?
                    notifications.map((notification) => {
                        const { type } = notification
                        if(type === 'followed') return <NotificationFollowing notification={notification} key={notification.id_notification} />
                        if(type === 'comment on post') return <NotificationComment notification={notification} key={notification.id_notification} />
                        if(type === 'like on post') return <NotificationLike notification={notification} key={notification.id_notification} />
                    })
                :
                    <div className="not-notifications-yet">
                        <h2>No hay notificaciones para mostrar</h2>
                        <Link to={`/discover/people`}>Descubre amigos</Link>
                    </div>
                }
            </div>
        </main>
     );
}

const NotificationFollowing = ({ notification }) => {
    const { user } = notification
    return ( 
        <div className="notification-user-following-section">
            <Link to={`/${user.username}`}>
                <img src={user.avatar} alt="" />
            </Link>
            <div className="info-notification-user">
                <span><Link to={`/${user.username}`}>{user.username}</Link> ha comenzado a seguirte</span>
            </div>
        </div>
     );
}
const NotificationComment = ({ notification }) => {
    const { post, user, comment_text } = notification
    return ( 
        <div className="notification-user-comment-section">
            <Link to={`/${user.username}`}>
                <img src={user.avatar} alt="" />
            </Link>
            <div className="info-notification-user">
                <span><Link to={`/${user.username}`}>{user.username}</Link> ha comentado:</span>
                <p>{comment_text}</p>
            </div>
            <Link to={`/${post.username}/post/${post._id}`}>
                <img src={post.image} alt="" className="photo-commented" />
            </Link>
        </div>
     );
}
const NotificationLike = ({ notification }) => {
    const { post, user } = notification
    return ( 
        <div className="notification-user-like-section">
            <Link to={`/${user.username}`}>
                <img src={user.avatar} alt="" />
            </Link>
            <div className="info-notification-user">
                <span><Link to={`/${user.username}`}>{user.username}</Link> le ha gustado tu foto</span>
            </div>
            <Link to={`/${post.username}/post/${post._id}`}>
                <img src={post.image} alt="" className="photo-liked" />
            </Link>
        </div>
     );
}
 
export default Notifications;
