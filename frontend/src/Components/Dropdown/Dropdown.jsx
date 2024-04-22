import React, { useEffect, useState } from 'react'
import dropdownStyles from './dropdown.module.css'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const Dropdown = ({children, title = 'Title', itemsList  = []}) => {

    /*const exampleList = [
        {name: 'Link1',
        link: '',
        onClick: ''},
        {name: 'Link2',
        link: '',
        onClick: ''},
    ]; */

    const [isDown, setIsDown] = useState(false);

    const toggleList = () => {
      setIsDown(!isDown);  
    };

    const selectItem = () =>{
        setIsDown(false);
    }

    useEffect(()=>{
        setIsDown(false);
    },[])


    return (
        <div className={dropdownStyles.dropdownContainer}>
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
                            <div className={dropdownStyles.dropdownMenu}>
                                <ul>{children}</ul>
                            </div>
                          
                        </div>
                      )
                }
                
            </div>

        </div>
    )
}

export default Dropdown