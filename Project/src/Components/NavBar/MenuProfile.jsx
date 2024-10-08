import { auth } from '../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

import Dropdown from '../Dropdown/Dropdown';
import DropdownLink from '../Dropdown/DropdownLink';
import DropdownItem from '../Dropdown/DropdownItem';

const MenuButtons = () => {
    const [username, setUsername] = useState('Not');
    const [_user, setUser] = useState(false);

    const signOutUser = async()=>{
        try{
            await signOut(auth);
            window.location.reload();
        }
        catch (err){
            console.error(err);
        }
    }

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setUser(true)
                setUsername(user.email)
            }
        })
    },[])

    if (_user) {
        return (
            <Dropdown 
            title={username}
            align='right'>
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