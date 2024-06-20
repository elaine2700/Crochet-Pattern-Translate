import { useState, useEffect } from 'react'
import buttonStyles from '../../../../Components/Buttons/buttons.module.css'
import Button from '../../../../Components/Buttons/Button'
import { useNavigate } from 'react-router-dom'
import { CONTENTMANAGEMENT_PATTERNS } from '../../../../config/links_path'
import { createObjectInDatabase } from '../content_service'

// Picture
// Name
// Description
// Difficulty
// Materials
//  - Hook
//  - Yarn colors 
//  - Others
// Written Pattern In the future. Instructions
// Link to Video tutorial

const Upsert = () => {
  const navigate = useNavigate();
  const imageNotFoundPath = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';

  const [patternId, setPatternId] = useState('');
  const [previewPicture, setPreviewPicture] =useState(null);
  const [stitchPicture, setStitchPicture] = useState(null);
  const [pictureUrl, setPictureUrl] = useState('');
  const [patternName, setPatternName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [hookSize, setHookSize] = useState(0);
  const [colors, setColors] = useState([]);
  const [others, setOthers]= useState([]);
  const [pattern, setPattern]= useState('');
  const [videoTutorial, setVideoTutorial] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createPattern();
    console.log('Adding pattern..');
    console.log('Hello');
  }

  const createPattern = async () =>{
    console.log('Creating Pattern');

    // TODO: Convert Colors to Array
    // TODO: Convert Others to Array
    // TODO: Get Stitch Picture

    const patternObject = {
      name: patternName,
      description: description,
      difficulty: difficulty,
      hook: hookSize,
      pattern: pattern,
      video: videoTutorial
    };

    // Upload Doc
    try{
      // TODO: test
      await createObjectInDatabase(patternObject, 'patterns');
    }
    catch(error){
      console.log(error);
    }

    // Upload Picture File

  }


  return (
    <div className='form-container'>
      <h1 className='title'>Add New Pattern</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label htmlFor='pattern-name'>Name</label>
        <input id='pattern-name' onChange={e=>setPatternName(e.target.value)}/>

        <div className='flex-container flex-small-gap'>
          <div>
            <h4>Picture</h4>
            <img className='fit-picture' src={pictureUrl != '' ? pictureUrl : imageNotFoundPath} />
          </div>
          {!previewPicture ? <div></div> :
            <div>
              <h4>New Picture</h4>
              <img src={previewPicture} className='fit-picture'/>
            </div> 
          }
        </div>
        <label htmlFor='pattern-picture'>{patternId == '' ? 'Choose a ' : 'Change '}Picture file</label>
        <input id='pattern-picture' type='file' onChange={(e)=>{
            setStitchPicture(e.target.files[0])
            console.log(URL.createObjectURL(e.target.files[0]))
            setPreviewPicture(URL.createObjectURL(e.target.files[0]))
          }}/>

        <label htmlFor='pattern-description'>Description</label>
        <textarea id='pattern-description' placeholder='This pattern is ...' rows='3' cols='50' onChange={e => setDescription(e.target.value)}></textarea>

        <label htmlFor="difficulty">Difficulty</label>
        <select id='difficulty' name='difficulty' onChange={e => setDifficulty(e.target.value)}>
        <option value="" disabled>--Select Type--</option>
          <option value='Easy'>Easy</option>
          <option value='Medium'>Medium</option>
          <option value='Hard'>Hard</option>
        </select>

        <label htmlFor='pattern-hook'>Hook size in mm</label>
        <input type='number' id='pattern-hook' onChange={e => setHookSize(e.target.value)}/>

        <label htmlFor='pattern-colors'>Colors ---Use #colorcode---</label>
        <textarea id='pattern-colors' rows='2' cols='50'></textarea>

        <label htmlFor='pattern-other'>Other Materials</label>
        <textarea id='pattern-other' rows='2' cols='50'></textarea>

        <label htmlFor='pattern-lines'>Pattern</label>
        <textarea id='pattern-lines' rows='5' cols='50' onChange={e => setPattern(e.target.value)}></textarea>

        <label htmlFor='pattern-video'>Link to video</label>
        <input id='pattern-video' onChange={e => setVideoTutorial(e.target.value)}></input>

        <div className='buttons-line'>
          <input className={`${buttonStyles.btn} ${buttonStyles.btnFilled} ${buttonStyles.btnSecondary}`}
            type='submit'
            value='Save Changes'/>
          <Button
            content='Back'
            type='outline' variant='secondary'
            onClick={() => navigate(CONTENTMANAGEMENT_PATTERNS)}/>
        </div>

      </form>
    </div>
  )
}

export default Upsert