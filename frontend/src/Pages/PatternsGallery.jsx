import React, {useState, useEffect} from 'react'
import SearchBar from '../Components/SearchBar'
import GalleryCard from '../Components/GalleryCard'

const PatternsGallery = () => {
  // Todo replace with database objects.
  const allPatterns = ['Amigurumi 1', 'Amigurumi 2', 'Amigurumi 3', 'Amigurumi 4', 'Amigurumi 5']
    
  const [patterns, setPatterns] = useState([]);

  useEffect(()=>{
    setPatterns(allPatterns);
  }, [])

  return (
      <div>
          <SearchBar stitchesList={allPatterns} setFilterStitches={setPatterns} />
          <div className='gallery-container'>
              {
                  patterns.map((pattern, index) => {
                      return (<GalleryCard key={index} cardName={pattern} />)
                  })
              }
          </div>
      </div>
  )
}

export default PatternsGallery