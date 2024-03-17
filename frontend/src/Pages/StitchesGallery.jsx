import { useState, useEffect } from 'react'
import GalleryCard from '../Components/Gallery Card/GalleryCard'
import SearchBar from '../Components/Search Bar/SearchBar'
import axios from 'axios'
import {db} from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'


const StitchesGallery = () => {
    // TODO replace with database objects.
    const allStitches = ['Single Crochet', 'Double Crochet', 'Slip Stitch', 'Chain', 'Popcorn']

    const [stitches, setStitches] = useState([]);

    const stitchesCollection = collection(db, "stitches" );
    
    const cardPath = (stitchId)=>{
        return `/stitch-details/${stitchId}`
    }

    useEffect(()=>{
        // Read the data.
        const getStitchesList = async () => {
            try{
                const data = await getDocs(stitchesCollection);
                const filteredData = data.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id
                    }));
                setStitches(filteredData);
            }
            catch (error){
                console.error(error)
                // TODO Create Oops Page
                // TODO redirect to Oops-Error Page
            }   
        }   
        // Set the Stitch List.
        getStitchesList();
    }, [])

    return (
        <div>
            <SearchBar stitchesList={allStitches} setFilterStitches={setStitches} />
            <div className='gallery-container'>
                {
                    stitches.map((stitch, index) => {
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

export default StitchesGallery