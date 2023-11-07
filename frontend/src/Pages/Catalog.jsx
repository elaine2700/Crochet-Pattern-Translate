import React, {useState, useEffect} from 'react'
import SearchBar from '../Components/SearchBar'
import GalleryCard from '../Components/GalleryCard';

const Catalog = () => {
    // Todo replace with database objects.
    const allStitches = ['Single Crochet', 'Double Crochet', 'Slip Stitch', 'Chain', 'Popcorn']
    
    const [stitches, setStitches] = useState([]);

    useEffect(()=>{
      setStitches(allStitches);
    }, [])

    return (
        <div>
            <SearchBar stitchesList={allStitches} setFilterStitches={setStitches} />
            <div className='gallery-container'>
                {
                    stitches.map((stitch, index) => {
                        return (<GalleryCard key={index} stitchName={stitch} />)
                    })
                }
            </div>
        </div>
    )
}

export default Catalog