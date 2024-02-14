import navbarStyles from './navbar.module.css'
import { Link } from 'react-router-dom';

const MenuButtons = () => {

    return (
        <div key={90} className={navbarStyles.list}>
            <div>
                <Link to={'/login'} className="btn-secondary">Log In / Register</Link>
            </div>
        </div>
    )
}

export default MenuButtons