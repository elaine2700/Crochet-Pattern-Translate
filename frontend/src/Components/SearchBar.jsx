import React, {useState} from 'react'
import {HiSearch} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'

const SearchBar = ({setFilterStitches, stitchesList}) => {

  const [searchVal, setSearchVal] = useState('');

  const handleInput = (event) => {
    setSearchVal(event.target.value);
    
    const filterStitches = stitchesList.filter((stitch)=>{
      const currVal = stitch.toLowerCase();
      const searchTerm = searchVal.toLowerCase();
      return currVal.includes(searchTerm);
    })

    setFilterStitches(filterStitches);
  }

  return (
    <div className='searchBar-container'>
      <div className='searchBar-bar'>
        <HiSearch/>
        <label
        htmlFor='stitch-search'
        id='search-label'>Search</label>
        <input
          placeholder='Search'
          value={searchVal}
          type='text'
          name='stitch-search'
          id='stitch-search'
          onChange={(e) => {return handleInput(e)}}/>
        <AiOutlineClose/>
        
      </div>
      <p>{searchVal}</p>
    </div>
  )
}

export default SearchBar