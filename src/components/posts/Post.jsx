import React from './post.css'
import SinglePost from './post/SinglePost'

const Post = ({post}) => {
  return (
    <div className='post'>
      {
        post.map((p)=>{
          return(
            <SinglePost post={p} />
          )
        })
      }
    </div>
  )
}

export default Post
