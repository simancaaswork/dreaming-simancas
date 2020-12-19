import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { DreamingContext } from '../../../context/DreamingContext'

const NavDiscover = () => {
    const dreamingContext = useContext(DreamingContext)
    const { posts, usersSuggest } = dreamingContext

    return ( 
        <section className="nav-discover-posts" style={{ marginBottom: '.4rem'}}>
            <Link to={'/discover/people'}>
                <div className="grid-discover-people-nav">
                    {usersSuggest?.slice(0, 3).map((user => (
                        <img 
                            src={user.avatar} 
                            alt={user.name}
                            key={user._id} 
                        />
                    )))}
                </div>
                <h5>Descrubre personas</h5>
                <span>Síguelos e interactúa</span>
            </Link>
            <Link to={'/discover/posts'}>
                <div className="grid-discover-photos-nav">
                    {posts?.slice(0, 3).map((post) => (
                        <img 
                            src={post.image} 
                            alt={post.caption}
                            key={post._id} 
                        />
                    ))}
                </div>
                <h5>Descubre fotos</h5>
                <span>Dreaming visual</span>
            </Link>
        </section>
     );
}
 
export default NavDiscover;
