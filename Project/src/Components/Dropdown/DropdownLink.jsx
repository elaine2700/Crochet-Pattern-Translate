import React from 'react'
import { Link } from 'react-router-dom'
import dropdownStyles from './dropdown.module.css'

const DropdownLink = ({children, link}) => {
  return (
    <Link className={dropdownStyles.dropdownItem} to={link}>
        {children}
    </Link>
  )
}

export default DropdownLink