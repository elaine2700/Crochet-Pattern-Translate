import dropdownStyles from './dropdown.module.css'

const DropdownItem = ({children, onClick}) => {
  return (
    <div className={dropdownStyles.dropdownItem} onClick={onClick}>
      {children}
    </div>
  )
}

export default DropdownItem