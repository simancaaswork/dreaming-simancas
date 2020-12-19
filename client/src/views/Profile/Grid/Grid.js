import { Link } from 'react-router-dom'
import Publication from './Publication'

const Grid = ({ myPost, userOnline }) => {
    const { username } = userOnline
    return ( 
        <div className="grid-publication-wrapper">
            {(myPost.length > 0) ?
                myPost.map((post) => (
                    <Publication 
                        key={post._id}
                        post={post}
                    />
                ))
            :
                <div className="alert-no-post-yet">
                    <h2>No tienes publicaciones en Dreaming aún</h2>
                    <p><Link to={`/${username}/upload/image`}>Puedes subir una</Link> cuando lo desees</p>
                </div>
            }
        </div>
     );
}
 
export default Grid;
