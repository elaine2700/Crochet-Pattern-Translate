import React, { useEffect, useState, useRef } from 'react'
import dropdownStyles from './dropdown.module.css'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Dropdown = ({children, title = 'Title', align = 'left'}) => {

    const [isDown, setIsDown] = useState(false);
    const dropdownRef = useRef(null);
    
    const getAlignCssClass = (alignment) =>{
        switch(alignment){
            case 'left':
                return dropdownStyles.alignLeft;
            case 'right':
                return dropdownStyles.alignRight;
            case 'center':
                return dropdownStyles.alignCenter;
            default:
                return dropdownStyles.alignLeft;
        }
    }

    const toggleList = () => {
      setIsDown(!isDown);  
    };

    const handleItemClick = () =>{
        setIsDown(false);
    }

    const handleClickOutside = (event) =>{
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDown(false);
        }
    }

    const alignCssClass = getAlignCssClass(align);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className={dropdownStyles.dropdownContainer} ref={dropdownRef}>
            <div className={dropdownStyles.dropdown}>
                <button className={dropdownStyles.dropdownBtn}
                onClick={toggleList}>
                    {title}              
                    {
                        isDown ?
                        <FaAngleUp/> :
                        <FaAngleDown/>
                    }
                </button> 
                {
                    isDown && (
                        <div className={dropdownStyles.dropdownMenuContainer}>
                            <div className={`${dropdownStyles.dropdownMenu} ${alignCssClass}`}>
                                <ul 
                                onClick={handleItemClick}>
                                    {children}
                                </ul>
                            </div>
                          
                        </div>
                      )
                }
                
            </div>

        </div>
    )
}

export default Dropdown