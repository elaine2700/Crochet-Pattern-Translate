import navbarStyles from './navbar.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import {STITCHES_INDEX, HOME, PATTERNS_INDEX, CONTACT, CONTENTMANAGEMENT_STITCHES, CONTENTMANAGEMENT_PATTERNS} from '../../config/links_path';
import DropdownLink from '../Dropdown/DropdownLink'
import { userIsInRole } from '../../Pages/Admin/userRolesService';
import { auth } from '../../config/firebase';

const MenuLinks = ({activeTab = ''}) => {

  // Set a tab page as active.
  const [active, setActive] = useState('');

  const _HOME = 'HOME';
  const _STITCHES = 'STITCHES';
  const _PATTERNS = 'PATTERNS';
  const _CONTRIBUTE = 'CONTRIBUTE';

  const handleClickTab = (tabName) => {
    setActive(tabName);
    console.log(active);
  }

  const [hasAccess, setHasAccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setActive(activeTab);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loggedIn != undefined) {
      // Check if user has access
      const userHasAccess = async ()=>{
        try{
          const access = await userIsInRole(['admin']);
          setHasAccess(access);
          console.log(`Has access: ${hasAccess}`)
        }catch(err){
          console.error(err);
          setHasAccess(false);
        }
      }
      userHasAccess();
    }
  }, [loggedIn]);

  return (
    <nav className={navbarStyles.list}>
      <Link className={`${navbarStyles.linkItem} ${active === _HOME? navbarStyles.active : ''}`} 
      to={HOME} onClick={()=>handleClickTab(_HOME)}>Home</Link>
      <Link className={`${navbarStyles.linkItem} ${active === _STITCHES? navbarStyles.active : ''}`}
       to={STITCHES_INDEX} onClick={()=>handleClickTab(_STITCHES)}>Stitches</Link>
      <Link className={`${navbarStyles.linkItem} ${active === _PATTERNS? navbarStyles.active : ''}`}
      to={PATTERNS_INDEX} onClick={()=>handleClickTab(_PATTERNS)}>Patterns</Link>
      <Link className={`${navbarStyles.linkItem} ${active === _CONTRIBUTE? navbarStyles.active : ''}`}
      to={CONTACT} onClick={()=>handleClickTab(_CONTRIBUTE)}>Contribute</Link>
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