import { useState, useEffect } from 'react'
import GalleryCard from '../Components/Gallery Card/GalleryCard'
import SearchBar from '../Components/Search Bar/SearchBar'
import Loading from '../Components/Loading/Loading'
import { getCollectionList } from './Admin/ContentManagement/content_service'

const StitchesGallery = () => {
    const [filteredStitches, setFilteredStitches] = useState([]);
    const [stitches, setStitches] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const cardPath = (stitchId)=>{
        return `/stitch-details/${stitchId}`
    }

    useEffect(()=>{
        // Read the data.
        setLoading(true);
        const getStitchesList = async () => {
            try{
                const stitchesList = await getCollectionList('stitches');
                setStitches(stitchesList);
                setLoading(false);
            }
            catch (error){
                console.error(error)
            }   
        }   
        // Set the Stitch List.
        getStitchesList();
        
    }, [])

    if(loading){
        return (
            <div className='section-container'>
                <Loading/>
            </div>
        )
    }
    else{
        return (
            <div className='section-container'>
                <SearchBar 
                data={stitches} 
                onResults={setFilteredStitches}
                searchProperty='name'/>
                <div className='gallery-container'>
                    {
                        filteredStitches.map((stitch, index) => {
                            return (<GalleryCard key={index} 
                                cardName={stitch.name} 
                                linkTo={cardPath(stitch.id)} 
                                imagePath={stitch.picture.url} />)
                        })
                    }
                </div>
            </div>
        )
    }
    
}

export default StitchesGallery