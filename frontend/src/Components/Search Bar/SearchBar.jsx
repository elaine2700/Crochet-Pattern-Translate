import React, {useEffect, useState} from 'react'
import {HiSearch} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import searchbarStyles from './searchbar.module.css'
import Button from '../Buttons/Button'

const SearchBar = ({onResults, data, searchProperty}) => {

  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    search(value);
  }
  const search = (query) => {
    setQuery(query);
    if (query === '') {
      onResults(data);
      return;
    }
    const filteredResults = data
      .filter(item => item[searchProperty]?.toLowerCase().includes(query.toLowerCase()));

    onResults(filteredResults);
  }

  useEffect(()=>{
    search('');
  },[])

  return (
    <div className={searchbarStyles.container}>
      <div className={searchbarStyles.bar}>
        <HiSearch/>
        <label className={searchbarStyles.label}
        htmlFor='stitch-search'
        id='search-label'>Search</label>
        <input
          placeholder='Search'
          value={query}
          type='text'
          name='stitch-search'
          id='stitch-search'
          onChange={handleSearch}/>
        <Button content={<AiOutlineClose/>}
        styleType='ghost' variant='secondary' use='icon' size='large'
        onClick={()=>search('')}/>
      </div>
    </div>
  )
}

export default SearchBar