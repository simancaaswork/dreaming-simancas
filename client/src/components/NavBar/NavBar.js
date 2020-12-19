import { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { DreamingContext } from '../../context/DreamingContext'

import NavUser from './NavUser'
import Notifications from './Notifications'

const NavBar = () => {

    const [ showPanel, setShowPanel ] = useState({
        notifications: false,
        navUser: false
    })

    const { notifications, navUser } = showPanel
    const history = useLocation()
    const { pathname } = history

    useEffect(() => {
        setShowPanel({ notifications: false, navUser: false })

    }, [pathname, setShowPanel])

    const dreamingContext = useContext(DreamingContext)
    const { userOnline, logOut, readedNotification } = dreamingContext
    const { notifications:notificationsUser } = userOnline
    const notificationsNotReaded = notificationsUser?.filter(notify => notify.readed === false)
    

    if(pathname === '/register' || pathname === '/login') {
        return null
    }

    return ( 
        <nav>
            <div className="project-name">
                <Link to="/" style={{ color: '#000', textDecoration: 'none'}}>
                    <h1>dreaming</h1>
                </Link>
            </div>
            <div className="btn-navigation">
                <Link to="/"><i className="fas fa-home"></i></Link>
                <div className="heart-icon"
                    onClick={() => {
                        setShowPanel((notifications) ? { navUser:false, notifications: false } : { navUser:false, notifications: true })
                        readedNotification()
                    }}
                >
                    <i className="far fa-heart"></i>
                    <span>{notificationsNotReaded?.length}</span>
                </div>
                <div className="user-profile"
                    style={{cursor: 'pointer'}}
                    onClick={() => setShowPanel((navUser) ? { notifications:false, navUser: false } : { notifications:false, navUser: true })}
                >
                    <img src={userOnline.avatar} alt="" />
                </div>
                <Link to={`/${userOnline.username}/upload/image`} className="post-route-btn">
                    <i className="fas fa-plus"></i>
                    <span>Publicar</span>
                </Link>
                {(navUser) ? <NavUser userOnline={userOnline} logOut={logOut} setShowPanel={setShowPanel} showPanel={showPanel} /> : null}
                {(notifications) ? <Notifications userOnline={userOnline} setShowPanel={setShowPanel} showPanel={showPanel} /> : null}
            </div>
        </nav>
     );
}
 
export default NavBar;
