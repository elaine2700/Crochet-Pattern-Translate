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

    /*useEffect(() => {
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
*/
    useEffect(()=>{
        // Read the data.
        const getMovieList = async () => {
            try{
                const data = await getDocs(stitchesCollection);
                const filteredData = data.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id
                    }));
                console.log(data.docs[0]._document.data.value.mapValue.fields);
                console.log(filteredData);
                setStitches(filteredData);
            }
            catch (error){
                console.error(error)
                // TODO redirect to Oops-Error Page
            }   
        }   
        // Set the Stitch List.
        getMovieList();

        //setStitches(allStitches);
    }, [])

    return (
        <div>
            <SearchBar stitchesList={allStitches} setFilterStitches={setStitches} />
            <div className='gallery-container'>
                {
                    stitches.map((stitch, index) => {
                        return (<GalleryCard key={index} cardName={stitch.name} linkTo={cardPath(stitch.id)} />)
                    })
                }
            </div>
        </div>
    )
}

export default StitchesGallery