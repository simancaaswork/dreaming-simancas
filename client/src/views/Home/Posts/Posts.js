import { useContext } from 'react'
import { DreamingContext } from '../../../context/DreamingContext'

import Post from './Post'

const Posts = () => {

    const dreamingContext = useContext(DreamingContext)
    const { posts } = dreamingContext

    return ( 
        <section className="wrapper-posts-home">
            {posts.map((post) => (
                <Post 
                    key={post._id}
                    post={post}
                />
            ))}
        </section>
     );
}
 
export default Posts;
