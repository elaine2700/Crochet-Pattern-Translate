import { useState, useEffect } from 'react'
import buttonStyles from '../../../../Components/Buttons/buttons.module.css'
import Button from '../../../../Components/Buttons/Button'
import { useNavigate } from 'react-router-dom'

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Adding pattern..');

    /*if(id){
      editStitch();
    }
    else{
      createStitch();
    }*/

  }


  return (
    <div className='form-container'>
      <h1 className='title'>Add New Pattern</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label htmlFor='pattern-name'>Name</label>
        <input id='pattern-name'/>

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
        <textarea id='pattern-description' placeholder='This pattern is ...' rows='3' cols='50'></textarea>

        <label htmlFor="difficulty">Difficulty</label>
        <select id='difficulty' name='difficulty'>
        <option value="" disabled>--Select Type--</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <label htmlFor='pattern-hook'>Hook size in mm</label>
        <input type='number' id='pattern-hook'/>

        <label htmlFor='pattern-colors'>Colors ---Use #colorcode---</label>
        <textarea id='pattern-colors' rows='2' cols='50'></textarea>

        <label htmlFor='pattern-other'>Other Materials</label>
        <textarea id='pattern-other' rows='2' cols='50'></textarea>

        <label htmlFor='pattern-lines'>Pattern</label>
        <textarea id='pattern-lines' rows='5' cols='50'></textarea>

        <label htmlFor='pattern-video'>Link to video</label>
        <input id='pattern-video'></input>

        <div className='buttons-line'>
          <input className={`${buttonStyles.btn} ${buttonStyles.btnFilled} ${buttonStyles.btnSecondary}`}
            type='submit'
            value='Save Changes'/>
          <Button
            content='Back'
            type='outline' variant='secondary'
            onClick={() => navigate('/content-management/stitches')}/>
        </div>

      </form>
    </div>
  )
}

export default Upsert