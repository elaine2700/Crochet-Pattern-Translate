import React, {useState, useEffect} from 'react'
import SearchBar from '../Components/Search Bar/SearchBar'
import GalleryCard from '../Components/Gallery Card/GalleryCard'

const PatternsGallery = () => {
  // Todo replace with database objects.
  const allPatterns = ['Amigurumi 1', 'Amigurumi 2', 'Amigurumi 3', 'Amigurumi 4', 'Amigurumi 5']
    
  const [patterns, setPatterns] = useState([]);

  const cardPath = '/pattern-details'

  useEffect(()=>{
    setPatterns(allPatterns);
  }, [])

  return (
      <div>
          <SearchBar stitchesList={allPatterns} setFilterStitches={setPatterns} />
          <div className='gallery-container'>
              {
                  patterns.map((pattern, index) => {
                      return (<GalleryCard key={index} cardName={pattern} linkTo={cardPath}/>)
                  })
              }
          </div>
      </div>
  )
}

export default PatternsGallery