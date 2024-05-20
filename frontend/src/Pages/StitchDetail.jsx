import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getStitch } from './Admin/ContentManagement/stitches_service';
import { STITCHES_INDEX } from '../config/links_path';

const StitchDetail = () => {
    const navigate = useNavigate();
    //const [stitch, setStitch] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const [videoTutorialPath, setVideoTutorialPath] = useState('https://www.youtube.com/@AmigurumiSpacecraft')
    const [stitchName, setStitchName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [stitchCombination, setStitchCombination] = useState([]);

    const setStitchFields = (stitch) => {
        setStitchName(stitch.name);
        setDescription(stitch.description);
        setDifficulty(stitch.difficulty);
        setStitchCombination(stitch.combination);
        setVideoTutorialPath(stitch.tutorial);
    }

    useEffect(()=>{
        

        const fetchStitch = async(stitchId) => {
            try{
                const stitch = await getStitch(stitchId);
                setStitchFields(stitch);
                setLoading(false);
            }
            catch(err){
                console.log(err);
                navigate(STITCHES_INDEX);
            }
        }
        fetchStitch(id);
    },[]);
    

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
                    <h1 className='title'>{stitchName}</h1>
                </header>
                <article>
                    <p className='paragraph'>{description}</p>

                    <p className='subtitle'>Difficulty</p>
                    <p className='paragraph'>{difficulty}</p>
                    
                    <p className='subtitle'>
                        Basic stitches to create this combination
                    </p>
                    
                    <ul className='tags'>
                        {stitchCombination.map((symbol, index)=>(
                            <li className='stitch-tag' key={index}>
                                <div>
                                    <img src='/single.png'/>
                                    <p>{symbol}</p>
                                </div>
                            </li>
                        ))}
                    </ul> 
                    
                    <p className='subtitle'>Diagram</p>
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