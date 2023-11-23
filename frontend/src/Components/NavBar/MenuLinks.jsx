import navbarStyles from './navbar.module.css'
import { Link } from 'react-router-dom'

const MenuLinks = () => {
  return (
    <nav className={navbarStyles.list}>
        <Link to={'/'}>Home</Link>
        <Link to={'/stitches'}>Stitches</Link>
        <Link to={'/patterns'}>Patterns</Link>
        <Link to={'/contact'}>Contribute</Link>
      </nav>
  )
}

export default MenuLinks