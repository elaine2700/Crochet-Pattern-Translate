import navbarStyles from './navbar.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

import Dropdown from '../Dropdown/Dropdown';
import { ADMIN_AREA } from '../../config/links_path';
import DropdownLink from '../Dropdown/DropdownLink';
import DropdownItem from '../Dropdown/DropdownItem';

const MenuButtons = () => {
    const [username, setUsername] = useState('Not');
    const [_user, setUser] = useState(false);

    const navigate = useNavigate();
    const signOutUser = async()=>{
        try{
            await signOut(auth);
            console.log('sign out')
            navigate(0);
            navigate(ADMIN_AREA);
        }
        catch (err){
            console.error(err);
        }
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
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
            title={username}>
                <DropdownLink link='/'>Profile</DropdownLink>
                <DropdownItem onClick={signOutUser}>Log Out</DropdownItem>
            </Dropdown>
        )
    }
    else
    {
        return (
            <div></div>
        )
    }
}

export default MenuButtons