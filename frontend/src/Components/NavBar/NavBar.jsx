import { Link } from "react-router-dom"
import { IoMenu } from 'react-icons/io5'
import navbarStyles from './navbar.module.css'
import { useEffect, useState } from "react"
import MenuButtons from "./MenuButtons"
import MenuLinks from './MenuLinks'

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [list, setList] = useState([MenuLinks, MenuButtons]);

  useEffect(() => {

    const handleResize = () => {
      setCollapsed(window.innerWidth <= 900)
    };

    window.addEventListener('resize', handleResize);

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
          <div className={navbarStyles.collapsedMenu}>
            <span className={navbarStyles.closeIcon}>X</span>
            {
              renderMenuComponents(list)
            }
          </div>
        ) :
        (
          renderMenuComponents(list)
        )
      }

      <button
        className={navbarStyles.menuIcon}
        onClick={() => { console.log('Hello here') }}>
        <IoMenu />
      </button>
    </div>
  )


}

export default NavBar

