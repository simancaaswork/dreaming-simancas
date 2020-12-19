import { Link } from 'react-router-dom'

const User = ({ user }) => {
    const { username, avatar, biography, name } = user

    return ( 
        <div className="user-registered">
            <img src={avatar} alt="" />
            <Link to={`/${username}`}>{username}</Link>
            <p>{biography}</p>
            <h5>{name}</h5>
        </div>
     );
}
 
export default User;
