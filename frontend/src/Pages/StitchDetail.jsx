import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaExternalLinkAlt } from 'react-icons/fa';

const StitchDetail = () => {
    const navigate = useNavigate();
    const [stitch, setStitch] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const [videoTutorialPath, setVideoTutorialPath] = useState('https://www.youtube.com/@AmigurumiSpacecraft')

    const dummyObj = {
            stitchName: "Single Crochet",
            description: "Simple Description",
            stitchesCombination:["sc", "hdc"],
            stitchDificulty: "Simple"
    }

    useEffect(()=>{
        setStitch(dummyObj);
        setLoading(false);
    },[]);
    /*useEffect(()=>{
        setLoading(true);
        axios
            .get(`http://localhost:3030/stitches/${id}`)
            .then((response)=>{
                setStitch(response.data);
                setLoading(false);
                if(stitch.videoTutorial){
                    setVideoTutorialPath(stitch.videoTutorial);
                }
                
            })
            .catch((error)=>{
                console.log(error)
                navigate('/stitches')
            })
    },[])
    */

    if (loading)
        return (<div>Loading...</div>)
    else

    return (

        <div className='detail-section'>
            <div
                className='fit-picture'
                style={{ backgroundImage: `url('logo512.png')` }}>
            </div>
            <section className='detail-content'>
                <header className='header'>
                    <h1>{stitch.stitchName}</h1>
                </header>

                <h2 className='subtitle'>Description</h2>
                <p className='area'>{stitch.description}</p>

                <h2 className='subtitle'>Difficulty</h2>
                <p className='area'>{stitch.stitchDificulty}</p>
                
                <p className='subtitle'>Symbols</p>
                <div className='area'>
                    <ul className='tags'>
                        {stitch.stitchesCombination.map((symbol, index)=>(
                            <li className='stitch-tag' key={index}>
                                <div className='stitch-icon'>
                                    <img src='/single.png'/>
                                </div>
                                <p>{symbol}</p>
                            </li>
                        ))}
                    </ul> 
                </div>
                

                <h2 className='subtitle'>Diagram</h2>
                <div className='area'>
                    <img className='diagram' src='/moss.png'/>
                </div>

                <h2 className='subtitle'>Tutorial</h2>
                <a className='area' href={videoTutorialPath}
                    target='_blank'
                    rel="noopener noreferrer">
                        Link <FaExternalLinkAlt/>
                </a>
                
            </section>
        </div>


    )
}

export default StitchDetail