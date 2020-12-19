import { useContext, useEffect } from 'react'
import { DreamingContext } from '../../context/DreamingContext'
import User from './User'

const Discover = () => {
    const dreamingContext = useContext(DreamingContext)
    const { usersSuggest, userOnline, followUser, unfollowUser, getSuggetsUsers } = dreamingContext

    useEffect(() => {
        getSuggetsUsers()
    }, [])

    return ( 
        <main className="wrapper-users-registered">
            <div className="title-users-registered">
                <h2>Conoce personas</h2>
                <p>Síguelos, mira sus fotos y comparte con ellos</p>
            </div>
            <div className="grid-users-registerd">
                {usersSuggest.map((user) => (
                    <User 
                        user={user}
                        userOnline={userOnline}
                        unfollowUser={unfollowUser}
                        followUser={followUser}
                        key={user._id}
                    />
                ))}
            </div>
        </main>
     );
}
 
export default Discover;
