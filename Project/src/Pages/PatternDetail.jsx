import { useEffect, useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FaSquare } from 'react-icons/fa'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getItemInCollection } from './Admin/ContentManagement/content_service'
import { PATTERNS_INDEX } from '../config/links_path'
import Loading from '../Components/Loading/Loading'
import DOMPurify from 'dompurify';

const PatternDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [patternName, setPatternName] = useState('');
    const [patternId, setPatternId] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [patternAuthor, setPatternAuthor] = useState('');
    const [patternAuthorLink, setPatternAuthorLink] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [hookSize, setHookSize] = useState(0);
    const [colors, setColors] = useState([]);
    const [others, setOthers]= useState([]);
    const [pattern, setPattern]= useState('');
    const [videoTutorial, setVideoTutorial] = useState('');
    const [patternImg, setPatternImg] = useState('');
    const [stitches, setStitches] = useState ([]);
    const [abbreviations, setAbbreviations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPattern = async (docId) => {
        const patternItem = await getItemInCollection(docId, 'patterns');
        if(!patternItem){
            throw 'Pattern does not exist';
        }
        else{
            //setPatternId(id);
            setPatternName(patternItem.name);
            setDescription(patternItem.description);
            setDifficulty(patternItem.difficulty);
            setCategory(patternItem.category);
            setPattern(DOMPurify.sanitize(patternItem.pattern));
            setHookSize(patternItem.materials.hook);
            setColors(patternItem.materials.yarnColors);
            setOthers(patternItem.materials.others);
            setPatternAuthor(patternItem.patternAuthor.name);
            setPatternAuthorLink(patternItem.patternAuthor.link);
            setVideoTutorial(patternItem.video);
            setPatternImg(patternItem.picture.url);
            setAbbreviations(patternItem.abbreviations);
            setStitches(patternItem.stitches); 
        }
    }

    // Fetch Pattern
    useEffect(()=>{
        fetchPattern(id)
        .then(()=>{
            setLoading(false);
        }  
        ).catch((error)=>{
            console.warn(error);
            navigate(PATTERNS_INDEX);
        })
    },[])

    if (loading){
        return (
            <div className='section-container'>
                <Loading/>
            </div>
        )
    }    
    
    return (
        <div className='detail-section section-container'>
            <div className='detail img-container'>
                <img className='fit-picture' src={patternImg} alt={patternName} />
            </div>
            <section className='detail-content'>
                <header className='header'>
                    <h1>{patternName}</h1>
                </header>
                
                <h2 className='subtitle'>Author</h2>
                <div className='area'>
                    <Link to={patternAuthorLink} target='_black'>{patternAuthor} <FaExternalLinkAlt/></Link>
                </div>

                <h2 className='subtitle'>Category</h2>
                <div className='area'>{category}</div>

                <h2 className='subtitle'>Description</h2>
                <p className='area'>{description}</p>

                <h2 className='subtitle'>Difficulty</h2>
                <p className='area'>{difficulty}</p>

                <h2 className='subtitle'>Materials</h2>
                <div className='area'>
                    <div className='pattern-materials-area'>
                        <div className='cell'>
                            <div className='tags'>
                                <div className='rounded-icon'>
                                    <img className='fit-picture' src='/images/crochet_hook.png' alt='hook icon'/>
                                </div>
                                <div>
                                    <p>Hook</p>
                                    <p className='font-bold'>{hookSize} mm</p>
                                </div>
                            </div>
                        </div>
                        <div className='cell'>
                            <div>
                                <h3 className='font-bold'>Yarn Colors</h3>
                                <ul className='list-nodecoration'>
                                    {
                                        colors.map((colorItem, index)=>(
                                            <li key={index}><span style={{color: colorItem.code}}><FaSquare/></span> {colorItem.name}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='cell'>
                            <div>
                                <h3 className='font-bold'>Other</h3>
                                <ul>
                                    {
                                        others.map((otherItem, index)=>{
                                            if(otherItem){
                                                return (
                                                    <li key={index}>{otherItem}</li>
                                                )
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className='subtitle'>Abbreviations</h2>
                <div className='area'>
                    <ul className='tags'>
                    {
                        abbreviations.map((item, index) =>{
                            if(item){
                                return (
                                    <li key={index} className='tag'>
                                        <p>
                                            <span className='font-bold'>{item.abbreviation}</span> {item.description}
                                        </p>
                                    </li>
                                    )
                            }
                        })
                    }
                    {
                        stitches.map((item, index) => (
                            <li key={index} className='tag pattern-tag'>
                                <span className='font-bold'>{item.abbreviation}</span>
                                <span>{item.name}</span>
                            </li>
                        ))
                    } 
                    </ul>
                </div>

                <h2 className='subtitle'>Pattern</h2>
                <div className='area' dangerouslySetInnerHTML={{ __html: pattern }}></div>
                
                {
                    videoTutorial ? 
                    <>
                    <h2 className='subtitle'>Tutorial</h2>
                    <div className='area'>
                        <Link to={`https://${videoTutorial}`}
                            target='_blank'
                            rel="noopener noreferrer">
                                Link <FaExternalLinkAlt/>
                        </Link> 
                    </div>
                    </> :
                    null
                }
                
            </section>
        </div>
    )
     
}

export default PatternDetail