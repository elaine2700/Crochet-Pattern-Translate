import React, { useEffect, useState } from 'react'
import dropdownStyles from './dropdown.module.css'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Dropdown = ({title = 'Title', itemsList  = []}) => {

    /*const exampleList = [
        {name: 'Link1',
        link: ''},
        {name: 'Link2',
        link: ''},
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
                    isDown && itemsList.length > 0 ?
                    <div className={dropdownStyles.dropdownMenuContainer}>
                        <ul className={`${dropdownStyles.dropdownMenu}`}>
                            {
                                itemsList.map((item, id) =>(
                                    <li key={id}
                                        className={dropdownStyles.dropdownItem}
                                        onClick={selectItem}>
                                        <Link to={item.link}>{item.name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div> :
                    <div></div>
                }
                
            </div>

        </div>
    )
}

export default Dropdown