import  './singpost.css'
import {FaEdit} from "react-icons/fa"
import {BsTrash} from "react-icons/bs"
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../context/Context';

const SingPost = () => {
  const [post, setPost] = useState({})
  const {user} = useContext(Context)
  const [updatePost, setUpdatePost] = useState({
    title:post.title,
    desc:post.desc,
  })

 const {title, desc} = updatePost

  const [updateMode, setUpdateMode] = useState(false)
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // const {user} = useContext(Context)

  const pf = "http://localhost:7100/images/"

  useEffect(()=>{
    const getPost = async ()=>{
      const response = await axios.get(`http://localhost:7100/api/posts/${path}`)
      setPost(response.data)
      setUpdatePost({
        title:response.data.title,
        desc:response.data.desc
      })
    }
    getPost()
  },[path])

  const handleDelete = async () =>{
    try{
      await axios.delete(`http://localhost:7100/api/posts/${post._id}`,{data:{username: user.username}})
      window.location.replace('/')
    }catch(error){
      console.log(error)
    }
  }

  const HandleEdit = () =>{
    setUpdateMode(true)
    console.log(post.title + post.desc)
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    setUpdatePost(()=>{
      return{
        ...updatePost, [name]:value
      }
    })
  }
  const handleclick = async () =>{
    try{
      const res = await axios.put(`http://localhost:7100/api/posts/${post._id}`,{username: user.username, title, desc})
      alert(res.data.message)
      setUpdateMode(false)

    }catch(error){
      alert("something went wrong !")
    }
  }

  return (
    <div className='singpost'>
      <div className='singlepostWrapper'>
        {
          post.photo &&
        <img  className='singlePostImg' src={pf + post.photo} alt='bg2'></img>
        }
{
  updateMode ? 
  (
    <input type="text" value={updatePost.title} name='title' className='singlepostTitleInput' onChange={handleChange}></input>
  ) 
  :
  (
  <h1 className='singlePostTitle'>{title}
         { post.username === user?.username &&
          (
          <div className='singlePostEdit'>
          <FaEdit className='FaEdit' onClick={HandleEdit} style={{cursor:"pointer"}}/>
          <BsTrash className='BsTrash' onClick={handleDelete} />
      </div>
          )}
          </h1>
  )}

        <div className='singlePostInfo'>
            <span>author :
                <Link to={`/?user=${post.username}`} className="link"><b className='singlePostAuthor'>{post.username}</b></Link>
            </span>
            <span >{new Date(post.createdAt).toDateString()}</span>
        </div>
        {
          updateMode ?
          <textarea value={desc} name='desc' className='singlepostDescInput' onChange={handleChange}></textarea>
          :
          <p className="singlePostDesc">
          {post.desc}
        </p>
        }
        {
          updateMode &&
          <button className='singlepostButton' onClick={handleclick}>Update</button>
        }
      </div>
    </div>
  )
}


export default SingPost
