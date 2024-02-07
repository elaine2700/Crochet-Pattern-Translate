import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
                <header>
                    <h1>{stitch.stitchName}</h1>
                </header>
                <article>
                    <p>{stitch.description}</p>
                    <p>
                        Difficulty: {stitch.difficulty}
                    </p>
                    
                    <h3 className='subtitle'>
                        Required stitches:
                    </h3>
                    <ul className='tags'>
                        {stitch.stitchesCombination.map((symbol, index)=>(
                            <li className='stitch-tag' key={index}>
                                <div>
                                    <img src='/single.png'/>
                                    <p>{symbol.stitch}</p>
                                </div>
                            </li>
                        ))}
                    </ul> 
                    
                    <h3 className='subtitle'>Diagram</h3>
                    <img className='diagram' src='/moss.png'/>
                    
                    <a 
                        href={videoTutorialPath}
                        target='_blank'
                        rel="noopener noreferrer"
                        >Video Tutorial</a>
                </article>
            </section>
        </div>


    )
}

export default StitchDetail