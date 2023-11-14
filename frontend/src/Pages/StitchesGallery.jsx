import { useState, useEffect } from 'react'
import GalleryCard from '../Components/GalleryCard'
import SearchBar from '../Components/SearchBar'
import axios from 'axios'


const StitchesGallery = () => {
    // Todo replace with database objects.
    const allStitches = ['Single Crochet', 'Double Crochet', 'Slip Stitch', 'Chain', 'Popcorn']

    const [stitches, setStitches] = useState([]);

    const cardPath = '/stitch-details'
    useEffect(() => {
        axios
            .get('http://localhost:3030/stitches')
            .then((response) => {
                console.log(response)
                setStitches(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
        //setStitches(allStitches);
    }, [])

    return (
        <div>
            <SearchBar stitchesList={allStitches} setFilterStitches={setStitches} />
            <div className='gallery-container'>
                {
                    stitches.map((stitch, index) => {
                        return (<GalleryCard key={index} cardName={stitch.stitchName} linkTo={cardPath} />)
                    })
                }
            </div>
        </div>
    )
}

export default StitchesGallery