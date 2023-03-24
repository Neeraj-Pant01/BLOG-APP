import './header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className='header-titles'>
            <span className='header-titles-sm'>React & node</span>
            <span className='header-titles-ln'>Blog</span>
        </div>
        <img className='headerImg' src="/assets/fbg1.jpg"
        alt=""></img>
    </div>
  )
}

export default Header
