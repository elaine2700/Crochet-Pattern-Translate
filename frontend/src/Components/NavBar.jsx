import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className='navbar-container'>
        <img src='logo512.png'/>
        <nav className='navbar-list'>
            <Link to={'/'}>Home</Link>
            <Link to={'/stitches'}>Stitches</Link>
            <Link to={'/patterns'}>Patterns</Link>
            <Link to={'/contact'}>Contribute</Link>
        </nav>
        <img src='logo512.png'/>
    </div>
  )
}

export default NavBar

