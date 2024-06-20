import navbarStyles from './navbar.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import {STITCHES_INDEX, HOME, PATTERNS_INDEX, CONTACT, CONTENTMANAGEMENT_STITCHES, CONTENTMANAGEMENT_PATTERNS} from '../../config/links_path';
import DropdownLink from '../Dropdown/DropdownLink'
import { userIsInRole } from '../../Pages/Admin/userRolesService';
import { auth } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const MenuLinks = ({onClick} = ()=>console.log('default')) => {

  let clickAction = ()=>{
    console.log('default')
  }
  
  if(onClick != null){
    clickAction = onClick
  }

  const [hasAccess, setHasAccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  useEffect(() => {
    if (loggedIn != undefined) {
      // Check if user has access
      const userHasAccess = async ()=>{
        try{
          const access = await userIsInRole(['admin']);
          setHasAccess(access);
        }catch(err){
          console.error(err);
          setHasAccess(false);
        }
      }
      userHasAccess();
    }
  }, [loggedIn]);

  return (
    <nav key={80} className={navbarStyles.list}>
      <Link to={HOME} onClick={clickAction}>Home</Link>
      <Link to={STITCHES_INDEX} onClick={clickAction}>Stitches</Link>
      <Link to={PATTERNS_INDEX} onClick={clickAction}>Patterns</Link>
      <Link to={CONTACT} onClick={clickAction}>Contribute</Link>
      {
        hasAccess ? (
          <Dropdown title='Content'>
            <DropdownLink link={CONTENTMANAGEMENT_STITCHES}>Stitches</DropdownLink>
            <DropdownLink link={CONTENTMANAGEMENT_PATTERNS}>Patterns</DropdownLink>
          </Dropdown>
        ) : (null)
      }
      
    </nav>
  )
}

export default MenuLinks