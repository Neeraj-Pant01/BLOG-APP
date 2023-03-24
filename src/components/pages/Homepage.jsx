import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../header/Header'
import Post from '../posts/Post'
import Sidebar from '../sidebar/Sidebar'
import './homepage.css'

const Homepage = () => {
  const[post, setPost] = useState([])
  const {search} = useLocation();

  useEffect(()=>{
    getPosts()
  },[search])

  const getPosts = async () =>{
    const response = await axios.get(`http://localhost:7100/api/posts${search}`)
    setPost(response.data)
  }

  return (
    <>
    <Header />
    <div className='homepage'>
        <Post post={post} />
        <Sidebar />
    </div>
    </>

  )
}

export default Homepage
