import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { DreamingContext } from '../../../../context/DreamingContext'

const UserOnline = () => {

    const dreamingContext = useContext(DreamingContext)
    const { userOnline } = dreamingContext
    const { name, username, avatar } = userOnline

    return ( 
        <div className="user-account">
            <img src={avatar} alt="" />
            <div className="info-user-account">
                <Link to={`/${username}`}>{username}</Link>
                <span>{name}</span>
            </div>
        </div>
     );
}
 
export default UserOnline;
