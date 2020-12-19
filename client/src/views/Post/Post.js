import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { DreamingContext } from '../../context/DreamingContext'

import Information from './Information'
import PublicationsRelated from './PublicationsRelated'

const Post = () => {

    const dreamingContext = useContext(DreamingContext)
    const { getPostSolo, postSolo, postsRelated, likePost, commentPost, unlikePost, layoutComment, posts, userOnline } = dreamingContext

    const { id } = useParams()
    useEffect(() => {
        getPostSolo(id)

    }, [id, posts])


    if(Object.keys(postSolo).length === 0) { return null }

    const { image } = postSolo.post
    const { username } = postSolo.user
    

    return ( 
        <>
            <main className="post-alone-wrapper">
                <section className="image-complete-wrapper">
                    <img src={image} alt="" />
                </section>
                <Information 
                    postSolo={postSolo}
                    commentPost={commentPost}
                    likePost={likePost}
                    unlikePost={unlikePost}
                    layoutComment={layoutComment}
                    userOnline={userOnline}
                />
            </main>

            <PublicationsRelated 
                username={username}
                postsRelated={postsRelated}
            />
        </>
     );
}
 
export default Post;
