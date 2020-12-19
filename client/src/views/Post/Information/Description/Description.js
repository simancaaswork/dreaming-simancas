import { Link } from 'react-router-dom';

const Description = ({ caption, avatar, username, datePosted }) => {
    return ( 
        <div className="author-description-info">
            <img src={avatar} alt="" />
            <div className="description-by-author-post">
                <div className="author-descriontion-post">
                    <Link to={`/${username}`}>{username}</Link>
                    <p>{caption}</p>
                </div>
                <span className="date-posted">{datePosted}</span>
            </div>
        </div>
     );
}
 
export default Description;
