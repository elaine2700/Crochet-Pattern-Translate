import { IoMenu } from 'react-icons/io5'
import {IoMdClose} from 'react-icons/io';
import navbarStyles from './navbar.module.css'
import { useEffect, useState, useRef } from "react"
import MenuProfile from "./MenuProfile"
import MenuLinks from './MenuLinks'

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(true);
  const menuRef = useRef(null);

  // Open Close Menu when on collapsed State
  const openCloseMenu = (display)=>{
    setHidden(display);
  }

  // Events when Menu is Collapse
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
        setHidden(true);
    }
  };
  const handleItemClick = () => {
      setHidden(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 900)
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    openCloseMenu(true);
    document.addEventListener('mousedown', handleClickOutside);
    return ()=>{
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  if(!collapsed){
    return (
      <div className={navbarStyles.container}>
        <div className={navbarStyles.logo}>
          <img src='' alt='Crochet Spacecraft Logo'/>
          <h1>Crochet Spacecraft</h1>
        </div>
        <MenuLinks/>
        <MenuProfile/>
      </div>
    )
  }
  else{
    return (
      <div className={navbarStyles.container}>
        <div className={navbarStyles.logo}>
          {/* TODO Add logo here and add to Title (Browser tabs) */ }
          <h1>Crochet Spacecraft</h1>
        </div>
        {
          hidden ? 
          (
            <button type="button" 
              className={navbarStyles.menuIcon}
              onClick={()=> openCloseMenu(false)}>
                <IoMenu/>
            </button>
          )
           : 
          (
            <div className={navbarStyles.collapsedMenu} ref={menuRef}>
              <button 
                className={navbarStyles.closeIcon}
                onClick={()=>openCloseMenu(true)}
                  >
                    <IoMdClose/>
              </button>
              <div onClick={handleItemClick}>
                <MenuLinks />
                <MenuProfile />
              </div>
            </div>
          )
        }
      </div>
    )
    
  }
  


}

export default NavBar

