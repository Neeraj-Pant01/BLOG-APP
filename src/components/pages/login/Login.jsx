import './login.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useContext } from 'react'
import { Context } from '../../../context/Context'
import axios from 'axios'

const Login = () => {
  const userRef = useRef()
  const passwordRef = useRef()
  const {dispatch, isFetching} = useContext(Context)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
      const res = await axios.post("http://localhost:7100/api/user/login",{
        username: userRef.current.value,
        password: passwordRef.current.value
    });
    dispatch({type:"LOGIN_SUCCESS", payload : res.data})
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" ref={userRef} placeholder="Enter your username..." />
        <label>Password</label>
        <input className="loginInput" type="password" ref={passwordRef} placeholder="Enter your password..." />
        <button className="loginButton" type='submit'>Login</button>
      </form>
        <button className="loginRegisterButton"><Link className='link' to="/register">Register</Link></button>
    </div>
  )
}

export default Login
