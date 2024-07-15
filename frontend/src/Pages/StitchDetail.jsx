import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getItemInCollection } from './Admin/ContentManagement/content_service';
import { STITCHES_INDEX } from '../config/links_path';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Loading from '../Components/Loading/Loading';
import {imageBasePath} from '../data/stitches_data';

const StitchDetail = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [videoTutorialPath, setVideoTutorialPath] = useState('https://www.youtube.com/@AmigurumiSpacecraft')
    const [stitchName, setStitchName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [stitchCombination, setStitchCombination] = useState([]);
    const [contributedBy, setContributedBy] = useState("");
    const [picture, setPicture] = useState('');

    const setStitchFields = (stitch) => {
        setStitchName(stitch.name);
        setDescription(stitch.description);
        setDifficulty(stitch.difficulty);
        setStitchCombination(stitch.combination);
        setVideoTutorialPath(stitch.tutorial);
        setContributedBy(stitch.contributedBy);
        setPicture(stitch.picture.url);
    }

    useEffect(()=>{
        const fetchStitch = async(stitchId) => {
            try{
                const stitch = await getItemInCollection(stitchId, 'stitches');
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
        return (<div className='section-container'>
            <Loading/>
        </div>)
    else

    return (

        <div className='detail-section section-container'>
            <div
                className='fit-picture'
                style={{ backgroundImage: `url('${picture}')` }}>
            </div>
            <section className='detail-content'>
                <header className='header'>
                    <h1>{stitchName}</h1>
                </header>

                <h2 className='subtitle'>Description</h2>
                <p className='area'>{description}</p>

                <h2 className='subtitle'>Difficulty</h2>
                <p className='area'>{difficulty}</p>
                
                <p className='subtitle'>Symbols</p>
                <div className='area'>
                    <ul className='tags'>
                        {
                            stitchCombination.map((symbol, index) => (
                                <div className='flex-container flex-small-gap' key={index}>
                                    <div className='rounded-icon'>
                                        <img className='fit-picture' src={`${imageBasePath}${symbol.icon}`} alt='stitch icon' />
                                    </div>
                                    <div>
                                        <p className='font-bold'>{symbol.abbreviation}</p>
                                        <p className='font-small'>{symbol.name}</p>
                                    </div>
                                    
                                </div>
                            ))
                        }
                    </ul> 
                </div>

                <h2 className='subtitle'>Diagram</h2>
                <div className='area'>
                    <img className='diagram' src='/moss.png'/>
                </div>

                <h2 className='subtitle'>Tutorial</h2>
                <a className='area' href={`https://${videoTutorialPath}`}
                    target='_blank'
                    rel="noopener noreferrer">
                        Link <FaExternalLinkAlt/>
                </a>

                <h2 className='subtitle'>Added by</h2>
                <p className='area'>{contributedBy}</p>
                
            </section>
        </div>
    )
}

export default StitchDetail