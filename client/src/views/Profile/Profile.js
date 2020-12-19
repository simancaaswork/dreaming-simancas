import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserInfo from './UserInfo'
import Grid from './Grid'

import { DreamingContext } from '../../context/DreamingContext'

const Profile = () => {
    
    const { user:userProfile  } = useParams()
    
    const dreamingContext = useContext(DreamingContext)
    const { user, myPost, getUserInformation, userOnline, unfollowUser, followUser } = dreamingContext
    
    useEffect(() => {
        getUserInformation(userProfile)

    }, [userProfile])

    if(Object.keys(user).length === 0) { return null }

    return ( 
        <main className="profile-wrapper">
            <UserInfo 
                user={user}
                userOnline={userOnline}
                myPost={myPost}
                followUser={followUser}
                unfollowUser={unfollowUser}
            />
            <section className="body-profile-wrapper">
                <div className="header-publication">
                    <h5><i className="fas fa-columns"></i> Publicaciones</h5>
                </div>
                <Grid 
                    myPost={myPost}
                    userOnline={userOnline}
                />
            </section>
        </main>
     );
}
 
export default Profile;
