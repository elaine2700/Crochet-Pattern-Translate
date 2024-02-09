import navbarStyles from './navbar.module.css'
import { Link } from 'react-router-dom';

const MenuButtons = () => {

    return (
        <div key={90} className={navbarStyles.list}>
            <div>
                <Link to={'/login'} className="btn-secondary">Log In</Link>
                <Link to={'/signup'} className="btn-secondary">Register</Link>
            </div>
        </div>
    )
}

export default MenuButtons