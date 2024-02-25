import { Link } from "react-router-dom"
import { IoMenu } from 'react-icons/io5'
import navbarStyles from './navbar.module.css'
import { useEffect, useState } from "react"
import MenuButtons from "./MenuButtons"
import MenuLinks from './MenuLinks'


const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [list, setList] = useState([MenuLinks, MenuButtons]);
  const [hidden, setHidden] = useState(true);

  // Open Close Menu when on collapsed State
  const openCloseMenu = (display)=>{
    setHidden(display);
  }

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 900)
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    openCloseMenu(true);
    return ()=>{
      window.removeEventListener('resize', handleResize)
    }
  }, []);

  const renderMenuComponents = (componentsList) => {
    return (
      componentsList.map((component) => {
        return component()
      })
    )
  }

  return (
    <div className={navbarStyles.container}>
      <div className={navbarStyles.logo}>
        <h1>Crochet Spacecraft</h1>
      </div>

      {collapsed ?
        (
          <div className={
            hidden ? 
            `${navbarStyles.collapsedMenu} ${navbarStyles.hidden}` :
            navbarStyles.collapsedMenu }> 
            <button 
              className={navbarStyles.closeIcon}
              onClick={()=>openCloseMenu(true)}
                >
                  X
            </button>
            <MenuLinks onClick={()=>openCloseMenu(true)}/>
            <MenuButtons />
          </div>
        ) :
        (
          renderMenuComponents(list)
          
        )
      }

      <button
        className={navbarStyles.menuIcon}
        onClick={() => openCloseMenu(false)}>
        <IoMenu />
      </button>
    </div>
  )


}

export default NavBar

