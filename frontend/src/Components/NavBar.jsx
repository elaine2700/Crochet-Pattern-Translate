import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className='navbar-container'>
        <div className='navbar-list'>
          <h1>Crochet Spacecraft</h1>
        </div>
        <nav className='navbar-list'>
            <Link to={'/'}>Home</Link>
            <Link to={'/stitches'}>Stitches</Link>
            <Link to={'/patterns'}>Patterns</Link>
            <Link to={'/contact'}>Contribute</Link>
        </nav>
        <div className="navbar-list">
          <button className="btn-secondary">Sign In</button>
        </div>
    </div>
  )
}

export default NavBar

