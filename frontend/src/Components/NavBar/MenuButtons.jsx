import navbarStyles from './navbar.module.css'

const MenuButtons = () => {
    return (
        <div className={navbarStyles.list}>
            <div>
                <button className="btn-secondary">Sign In</button>
                <button className="btn-secondary">Register</button>
            </div>
        </div>
    )
}

export default MenuButtons