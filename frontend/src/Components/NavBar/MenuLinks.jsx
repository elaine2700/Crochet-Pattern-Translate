import navbarStyles from './navbar.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { FaDribbble } from 'react-icons/fa';
import {STITCHES_INDEX, HOME, PATTERNS_INDEX, CONTACT, CONTENTMANAGEMENT_STITCHES, CONTENTMANAGEMENT_PATTERNS} from '../../config/links_path';
import DropdownLink from '../Dropdown/DropdownLink'

const MenuLinks = ({onClick} = ()=>console.log('default')) => {

  let clickAction = ()=>{
    console.log('default')
  }
  
  if(onClick != null){
    clickAction = onClick
  }

  return (
    <nav key={80} className={navbarStyles.list}>
      <Link to={HOME} onClick={clickAction}>Home</Link>
      <Link to={STITCHES_INDEX} onClick={clickAction}>Stitches</Link>
      <Link to={PATTERNS_INDEX} onClick={clickAction}>Patterns</Link>
      <Link to={CONTACT} onClick={clickAction}>Contribute</Link>
      <Dropdown title='Content'>
          <DropdownLink link={CONTENTMANAGEMENT_STITCHES}>Stitches</DropdownLink>
          <DropdownLink link={CONTENTMANAGEMENT_PATTERNS}>Patterns</DropdownLink>
        </Dropdown>
    </nav>
  )
}

export default MenuLinks