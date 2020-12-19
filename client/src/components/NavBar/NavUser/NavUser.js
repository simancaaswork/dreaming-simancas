import { Link } from 'react-router-dom'

const NavUser = ({ userOnline, logOut, setShowPanel, showPanel }) => {
    
    const { username } = userOnline
    
    return ( 
        <div className="float-user-option"
            onMouseLeave={() => setShowPanel({ ...showPanel, navUser: false })}
        >
            <Link to={`/${username}`}><i className="far fa-user-circle"></i> perfil</Link>
            <Link to={`/${username}/config`}><i className="fas fa-hammer"></i> configuración</Link>
            <hr />
            <button
                onClick={() => logOut()}
            >salir</button>
        </div>
     );
}
 
export default NavUser;
