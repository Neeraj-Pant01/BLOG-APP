import './spost.css'
import {Link} from "react-router-dom"

const SinglePost = ({post}) => {
    const pf = "http://localhost:7100/images/"
  return (
    <div className='singlepost'>
        {
            post.photo &&
            <img className='postImg' src={pf + post.photo} alt='bg'></img>
        }
        <div className='postInfo'>
            <div className='postCats'>
            {
            post.categories.map((c)=>{
            return (<span className='postCat'>{c.name}</span>
            )
        })
        }
            </div>
            <Link to={`/single/${post._id}`} className='link'><span className='post-tile'>{post.title}</span></Link>
            <hr />
            <span className='postdate'>{
                new Date(post.createdAt).toDateString()
            }</span>
            <p className='post-desc'>
                {
                    post.desc
                }
            </p>
        </div>
    </div>
  )
}

export default SinglePost
