import './write.css'
import {FaPlus} from "react-icons/fa"
import { useContext, useState } from 'react'
import { Context } from '../../../context/Context'
import axios from 'axios'

const Write = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)

  const {user} = useContext(Context)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const newpost = {
      username : user.username,
      title,
      desc,
    }
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file",file)
      newpost.photo = fileName
    try{
      await axios.post('http://localhost:7100/api/uploads', data)
    }catch(error){
      console.log(error)
    }
  }

    try{
      const res = await axios.post('http://localhost:7100/api/posts', newpost)
      window.location.replace(`/single/${res.data._id}`)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="write">
{
  file &&
     <img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <FaPlus className="writeIcon" />
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e)=>setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  )
}

export default Write
