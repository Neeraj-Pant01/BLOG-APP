import './setting.css'
import {AiFillSetting} from "react-icons/ai"
import Sidebar from '../../sidebar/Sidebar'
import { useContext } from 'react'
import { Context } from '../../../context/Context'
import { useState } from 'react'
import axios from 'axios'

const Setting = () => {
  const {user, dispatch} = useContext(Context)
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState(user.password)

  const pf = "http://localhost:7100/images/"

  const handleSubmit = async (e) =>{
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedpost = {
      userID : user._id,
      username,
      email,
      password,
    }
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file",file)
      updatedpost.profilePic = fileName
    try{
      await axios.post('http://localhost:7100/api/uploads', data)
    }catch(error){
      console.log(error)
    }
  }

    try{
      const res = await axios.put(`http://localhost:7100/api/users/${user._id}`, updatedpost)
      dispatch({type:"UPDATE_SUCCESS", payload:res.data})
      alert(res.data.message)
    }catch(error){
      console.log(error)
      dispatch({type:"UPDATE_FAILURE"})
    }
  }
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : (pf + user.profilePic)}
              alt=""
            />
            <label htmlFor="fileInput">
              <AiFillSetting className="settingsPPIcon" />{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e)=>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder="user01" name="name" value={username} onChange={(e)=>setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder="user01@gmail.com" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="enter new Password" name="password" onChange={(e)=>setPassword(e.target.value)} />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  )
}

export default Setting
