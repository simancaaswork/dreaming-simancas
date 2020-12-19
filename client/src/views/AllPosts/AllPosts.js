import { useContext } from 'react'

import { DreamingContext } from '../../context/DreamingContext'
import Post from './Post'

const AllPosts = () => {
    const dreamingContext = useContext(DreamingContext)
    const { posts } = dreamingContext
    return ( 
        <main className="wrapper-posts-created-all">
            <div className="grid-posts-created-all">
                {posts.map(post => (
                    <Post 
                        post={post}
                    />
                ))}
            </div>
        </main>
     );
}
 
export default AllPosts;
