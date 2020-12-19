import { useContext } from 'react'
import { DreamingContext } from '../../../../context/DreamingContext'

import { Link } from 'react-router-dom'

const SuggestPeople = () => {

    const dreamingContext = useContext(DreamingContext)
    const { usersSuggest } = dreamingContext

    return ( 
        <div className="suggest-people-to-user">
            <div className="header-suggest">
                <h5>Sugerencias para ti</h5>
                <Link to={'/discover/people'}>Ver todo</Link>
            </div>
            <div className="list-people-suggested">
                {usersSuggest.slice(0, 4).map((user_suggest) => (         
                    <div className="user-suggest" key={user_suggest._id}>
                        <div className="user-suggest-detail">
                            <img src={user_suggest.avatar} alt="" />
                            <div className="info-user-suggest">
                                <Link to={`/${user_suggest.username}`}>{user_suggest.username}</Link>
                                <span>{user_suggest.name}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default SuggestPeople;
