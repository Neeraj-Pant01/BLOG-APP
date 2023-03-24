import  './sidebar.css'
import {FaFacebook} from "react-icons/fa"
import {FaInstagram} from "react-icons/fa"
import {FaTwitter} from "react-icons/fa"
import {FaLinkedin} from "react-icons/fa"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [cat, setCat] = useState([])
    useEffect(()=>{
        const getCat = async () =>{
            const response = await axios.get(`http://localhost:7100/api/categories`)
            setCat(response.data)
        }
        getCat()
    },[])
  return (
    <div className='sidebar'>
        <div className='sidebar-item'>
            <span className='sidebarItem-title'>ABOUT ME</span>
            <img src='/assets/sidebar.jpg' alt='sidebar img'></img>
            <p>
                Find your interest by searching various categories of your choices & get started by writing your new blog right now !
            </p>
        </div>
        <div className='sidebar-item'>
            <span className='sidebarItem-title'>
                CATEGORIES
            </span>
            <ul className='sidebar-list'>
                {cat.map((c, index)=>{
                    return (
                    <Link key={index} to={`/?cat=${c.name}`} className="link"><li className='sidebar-list-item'>{c.name}</li></Link>
                )
                })}
            </ul>
        </div>
        <div className='sidebar-item'>
            <span className='sidebarItem-title wd'>Follow Us</span>
            <div className='sidebar-socials'>
                <li className='sidebarIcon'><FaFacebook /></li>
                <li className='sidebarIcon'><FaInstagram /></li>
                <li className='sidebarIcon'><FaTwitter /></li>
                <li className='sidebarIcon'><FaLinkedin /></li>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
