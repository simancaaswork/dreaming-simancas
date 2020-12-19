import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'

import { DreamingContext } from '../../context/DreamingContext'

const NavBarMobile = () => {

    const history = useLocation()
    const { pathname } = history

    const dreamingContext = useContext(DreamingContext)
    const { userOnline, logOut } = dreamingContext
    const { username,notifications } = userOnline

    const notificationsNotReaded = notifications?.filter(notify => notify.readed === false)

    if(pathname === '/register' || pathname === '/login') {
        return null
    }

    return ( 
        <div className="navbar-mobile">
            <Link to="/">
                <i className="fas fa-home"></i>
            </Link>
            <Link to={`/${username}/notifications`} className="notifications-box">
                <i className="far fa-heart"></i>
                <span>{notificationsNotReaded?.length}</span>
            </Link>
            <Link to={`/${username}/upload/image`}>
                <i className="fas fa-plus"></i>
            </Link>
            <Link to={`/${username}`}>
                <i className="far fa-user-circle"></i>
            </Link>
            <Link to={`/${username}/config`}>
                <i className="fas fa-hammer"></i>
            </Link>
            <button
                onClick={() => logOut()}
            >
                <i className="fas fa-sign-out-alt"></i>
            </button>
        </div>
     );
}
 
export default NavBarMobile;
