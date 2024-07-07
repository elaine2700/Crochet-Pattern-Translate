import React, {useState, useEffect} from 'react'
import SearchBar from '../Components/Search Bar/SearchBar'
import GalleryCard from '../Components/Gallery Card/GalleryCard'
import { getCollectionList } from './Admin/ContentManagement/content_service'

const PatternsGallery = () => {
  // Todo replace with database objects. 
  const [patterns, setPatterns] = useState([]);
  const [filteredPatterns, setFilteredPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    const fetchPatterns = async () =>{
        try{
            const data = await getPatternList();

            console.log(data);
            if(data.length > 0){
                setPatterns(data);
            }
            setLoading(false);
        }
        catch{
            console.error("Pattern List could not be fetched");
        }
    }
    fetchPatterns();
  }, [])
  if(loading){
    return(
        <div>Loading...</div>
    )
  }
  else{
    return (
        <div className='section-container' >
            <SearchBar 
            data={patterns} 
            onResults={setFilteredPatterns} 
            searchProperty='name' />
            <div className='gallery-container'>
                {
                    filteredPatterns.map((pattern, index) => {
                        return (<GalleryCard key={index}
                          cardName={pattern.name}
                          linkTo={cardPath(pattern.id)}
                          imagePath={pattern.picture.url}/>)
                    })
                }
            </div>
        </div>
    )
  }
  
}

export default PatternsGallery