import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className='navbar-container'>
        <img src='logo512.png'/>
        <ul className='navbar-list'>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/stitches'}>Stitches</Link></li>
            <li><Link to={'/patterns'}>Patterns</Link></li>
            <li><Link to={'/contact'}>Contribute</Link></li>
        </ul>
        <img src='logo512.png'/>
    </div>
  )
}

export default NavBar

