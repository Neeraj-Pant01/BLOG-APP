import { Link } from 'react-router-dom'
import  './topbar.css'
import {FaFacebook} from "react-icons/fa"
import {FaInstagram} from "react-icons/fa"
import {FaTwitter} from "react-icons/fa"
import {FaLinkedin} from "react-icons/fa"
import {FaSearch} from "react-icons/fa"
import { useContext } from 'react'
import { Context } from '../../context/Context'

const Topbar = () => {
  const {user, dispatch} = useContext(Context)

  const handleLogout = () =>{
    dispatch({type:"LOGOUT"})
  }
  const pf = "http://localhost:7100/images/"

  return (
    <div className="topbar">
        <div className='topbar-left'>
          <FaFacebook className='sidebar-icons' />
          <FaInstagram className='sidebar-icons' />
          <FaTwitter className='sidebar-icons' />
          <FaLinkedin className='sidebar-icons' />
        </div>
        <div className='topbar-center'>
            <ul className='topbar-list-center'>
                <li className='toplistItem'><Link className='link' to="/">HOME</Link></li>
                <li className='toplistItem'><Link className='link' to="/">ABOUT</Link></li>
                <li className='toplistItem'><Link className='link' to="/">CONTACT</Link></li>
                <li className='toplistItem'><Link className='link' to="/write">WRITE</Link></li>
                <li className='toplistItem' onClick={handleLogout}>{user && "LOGOUT"}</li>
            </ul>
        </div>
        <div className='topbar-right'>
           { user ?
           <>
          <Link to='/setting' className='link'><img className='topbar-profileImg' src={user.profilePic ? (pf + user.profilePic) : '/assets/avatar.png'} alt=''></img></Link>
          <FaSearch className='sidebar-search-icon' />
          </>
            :
            <ul className='topbar-list-center'>
              <li className='toplistItem'><Link className='link' to="/login">LOGIN</Link></li>
              <li className='toplistItem'><Link className='link' to="/register">REGISTER</Link></li>
            </ul>
          }

        </div>
    </div>
  )
}

export default Topbar
