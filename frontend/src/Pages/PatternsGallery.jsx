import React, {useState, useEffect} from 'react'
import SearchBar from '../Components/Search Bar/SearchBar'
import GalleryCard from '../Components/Gallery Card/GalleryCard'
import { getCollectionList } from './Admin/ContentManagement/content_service'

const PatternsGallery = () => {
  // Todo replace with database objects.
  const allPatterns = ['Amigurumi 1', 'Amigurumi 2', 'Amigurumi 3', 'Amigurumi 4', 'Amigurumi 5']
    
  const [patterns, setPatterns] = useState([]);

  const cardPath = (patternId) => {
    return `/pattern-details/${patternId}`
  }

  const getPatternList = async () => {
    try{
        return await getCollectionList('patterns');
    }
    catch{
        return []
    }
  }

  useEffect(()=>{
    const fetchPatterns = async () =>{
        try{
            const data = await getPatternList();

            console.log(data);
            if(data.length > 0){
                setPatterns(data);
            }
            //setPatterns(data);
        }
        catch{
            console.error("Pattern List could not be fetched");
        }
    }
    fetchPatterns();
  }, [])

  return (
      <div>
          <SearchBar stitchesList={allPatterns} setFilterStitches={setPatterns} />
          <div className='gallery-container'>
              {
                  patterns.map((pattern, index) => {
                      return (<GalleryCard key={index}
                        cardName={pattern.name}
                        linkTo={cardPath(pattern.id)}
                        imagePath={pattern.picture}/>)
                  })
              }
          </div>
      </div>
  )
}

export default PatternsGallery