import navbarStyles from './navbar.module.css'
import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import Dropdown from '../Dropdown/Dropdown';

const MenuButtons = () => {
    const [username, setUsername] = useState('Not');
    const [_user, setUser] = useState(false);

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                console.log('User ')
                console.log(user.email);
                console.log(user.displayName)
                setUser(true)
                setUsername(user.email)
            }
            else{
                console.log('Not signedIn user')
            }
        })
    },[])
    
    // todo Dropdown for loggedIn user

    if (_user) {
        return (
            <Dropdown 
            title={username}
            itemsList={[
                {name: 'Profile', link: '/'},
                {name: 'Sign Out', link: '/signout'}
            ]}/>
        )
    }
    else
    {
        return (
            <div key={90} className={navbarStyles.list}>
                <div>
                    <Link to={'/login'} className="btn-secondary">Log In / Register</Link>
                </div>
            </div>
        )
    }
}

export default MenuButtons