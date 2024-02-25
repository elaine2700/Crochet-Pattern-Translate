import navbarStyles from './navbar.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';


const MenuLinks = ({onClick} = ()=>console.log('default')) => {
  /*let onClickAction = ()=>{console.log('default')};

  Object.defineProperty(this, "onClickAction", {
    get() {
      console.log("get!");
      return onClickAction;
    },
    set(value) {
      onClickAction = value;
    },
  });
  */
  let clickAction = ()=>{
    console.log('default')
  }
  
  if(onClick != null){
    clickAction = onClick
  }

  return (
    <nav key={80} className={navbarStyles.list}>
      <Link to={'/'} onClick={clickAction}>Home</Link>
      <Link to={'/stitches'} onClick={clickAction}>Stitches</Link>
      <Link to={'/patterns'} onClick={clickAction}>Patterns</Link>
      <Link to={'/contact'} onClick={clickAction}>Contribute</Link>
    </nav>
  )
}

export default MenuLinks