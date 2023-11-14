import React, {useState, useEffect} from 'react'
import GalleryCard from '../Components/GalleryCard'
import SearchBar from '../Components/SearchBar'


const StitchesGallery = () => {
  // Todo replace with database objects.
  const allStitches = ['Single Crochet', 'Double Crochet', 'Slip Stitch', 'Chain', 'Popcorn']
    
  const [stitches, setStitches] = useState([]);

  const cardPath = '/stitch-details'
  useEffect(()=>{
    setStitches(allStitches);
  }, [])

  return (
      <div>
          <SearchBar stitchesList={allStitches} setFilterStitches={setStitches} />
          <div className='gallery-container'>
              {
                  stitches.map((stitch, index) => {
                      return (<GalleryCard key={index} cardName={stitch} linkTo={cardPath}/>)
                  })
              }
          </div>
      </div>
  )
}

export default StitchesGallery