import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'

const Register = () => {
  const [newUser, setNewUser] = useState({
    username:'',
    email:'',
    password:''
  })
  const [error, setError] = useState(false)

  const handleChange = (e) =>{
    const {name, value} = e.target
    setNewUser(()=>{
      return{
        ...newUser, [name]:value
      }
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:7100/api/user/register',newUser)
       res.data && window.location.replace('/login')
    }catch(err){
      setError(true)
      error && alert("something went wrong")
    }
    setNewUser({
      username:'', 
      email:'',
      password:''
    })
  }

  return (
    <div className="register">
    <span className="registerTitle">Register</span>
    <form className="registerForm" onSubmit={handleSubmit}>
      <label>Username</label>
      <input className="registerInput" autoComplete='off' value={newUser.username} name='username' type="text" placeholder="Enter your username..." onChange={handleChange}/>
      <label>Email</label>
      <input className="registerInput" autoComplete='off' value={newUser.email} type="text" name='email' placeholder="Enter your email..." onChange={handleChange}/>
      <label>Password</label>
      <input className="registerInput" value={newUser.password} type="password" name='password' placeholder="Enter your password..." onChange={handleChange}/>
      <button className="registerButton" type='submit'>Register</button>
    </form>
      <button className="registerLoginButton"><Link className='link' to="/login">Login</Link></button>
  </div>
  )
}

export default Register
