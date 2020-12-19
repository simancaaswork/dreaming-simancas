import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const UserInfo = ({ user, myPost, userOnline, followUser, unfollowUser }) => {
    
    const { avatar, name, username, followers, following, website, biography, _id:id_user } = user
    const { _id:id_userOnline, following:followingUserOnline } = userOnline
    
    useEffect(() => {
        validateIsFollowing()
    }, [user, validateIsFollowing])

    const isFollowingByUserOnline = validateIsFollowing()

    function validateIsFollowing() {
        const isFollowing = followingUserOnline.filter((follower) => follower._id === id_user)
        
        if(isFollowing.length > 0) {
            return true
        } else {
            return false
        }
    }

    return ( 
        <section className="head-profile-wrapper">
            <div className="img-user-profile">
                <img src={avatar} alt={`Avatar de ${name}`} />
            </div>
            <div className="info-about-user-profile">
                <div className="user-btn-profile">
                    <h2>{username}</h2>
                    {!(id_userOnline !== id_user) ? null :
                        <div className="btns-follow-friend-user">
                            {(isFollowingByUserOnline) ? 
                                
                                <button className="unfollow-user"
                                    onClick={() => unfollowUser(id_user)}
                                >Dejar de seguir</button> 
                                : 
                                <button className="follow-user"
                                    onClick={() => followUser(user)}
                                >Seguir</button> 
                            }                            
                        </div>
                    }
                    {(id_userOnline === id_user) ? <Link to={`/${username}/config`}>editar perfil</Link> : null}
                </div>
                <div className="counter-followers-post">
                    <span><strong>{myPost.length}</strong> publicaciones</span>
                    <span><strong>{followers.length}</strong> seguidores</span>
                    <span><strong>{following.length}</strong> seguidos</span> 
                </div>
                <div className="bio-profile-user">
                    <p>{biography}</p>
                </div>
                <div className="last-info-user-profile">
                    <h4>{name}</h4>
                    <a href="#!">{website}</a>
                </div>
            </div>
        </section>
     );
}
 
export default UserInfo;
