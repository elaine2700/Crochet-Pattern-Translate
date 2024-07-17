import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { imagesStitchesFolderRef, storage } from '../../../../config/firebase'
import { uploadImage, deleteImage, updateObjectInDatabase, createObjectInDatabase, getItemInCollection } from '../content_service';
import stitches_data from '../../../../data/stitches_data';

import buttonStyles from '../../../../Components/Buttons/buttons.module.css'
import Button from '../../../../Components/Buttons/Button'
import { CONTENTMANAGEMENT_STITCHES, STITCHES_INDEX } from '../../../../config/links_path';

import {IoMdClose} from 'react-icons/io';

const Upsert = () => {
  const imageNotFoundPath = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
  const {id} = useParams();
  const navigate = useNavigate()

  const [stitchId, setStitchId] = useState('');
  const [stitchName, setStitchName] = useState('')
  const [stitchDescription, setDescription] = useState('')
  const [stitchType, setStitchType] = useState('');
  const [stitchContributedBy, setContributedBy] = useState('');
  const [stitchDifficulty, setDifficulty] = useState('');
  const [stitchPicture, setStitchPicture] = useState(null);
  const [picAuthor, setPicAuthor] = useState('');
  const [tutorialLink, setTutorialLink] = useState('');
  const [currentPicUrl, setCurrentPicUrl] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [previewPicture, setPreviewPicture] =useState(null);

  // Stitches Combination
  const [combinationIds, setCombinationIds] = useState([]);
  const selectedStitchesCombination = stitches_data.stitches_icons.filter(option => combinationIds.includes(option.id));

  const handleSelectCombination = (event) =>{
    const selectedIds = Array.from(event.target.selectedOptions, (option) => parseInt(option.value));
    setCombinationIds(selectedIds);
  }
  
  const removeStitchFromCombination = (index) =>{
    const updatedCombinationList = combinationIds.filter((item, i) => i !== index);
    setCombinationIds(updatedCombinationList);
  }
  
  const editStitch = async() =>{
    let updatedUrl = pictureUrl;
    if(stitchPicture != null){
      try {
        const picUrl = await uploadImage(stitchPicture, stitchName, imagesStitchesFolderRef);
        updatedUrl = picUrl;
        // Delete old file
        await deleteImage(storage, currentPicUrl);

      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error
        return;
      }
    }

    try{
      const stitchObject = {
        combination: selectedStitchesCombination,
        contributedBy: stitchContributedBy,
        description: stitchDescription,
        difficulty: stitchDifficulty,
        name: stitchName,
        picture: {
          author: picAuthor,
          url: updatedUrl
        },
        tutorial: tutorialLink,
        type: stitchType
      }
      await updateObjectInDatabase(id, stitchObject ,'stitches');
      navigate(CONTENTMANAGEMENT_STITCHES)
    }
    catch(error){
      console.error(error);
    }
  }

  const createStitch = async()=>{
    console.log('Creating the stitch')
    let url = pictureUrl;
    try {
      const picUrl = await uploadImage(stitchPicture, stitchName, imagesStitchesFolderRef);
      url = picUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return;
    }

    try{
      const stitchObject = {
        combination: selectedStitchesCombination,
        contributedBy: stitchContributedBy,
        description: stitchDescription,
        difficulty: stitchDifficulty,
        meta: {
          favs: 0,
          votes:0
        },
        name: stitchName,
        picture: {
          author: picAuthor,
          url: url
        },
        tutorial: tutorialLink,
        type: stitchType
      }
      await createObjectInDatabase(stitchObject, 'stitches');
      navigate(CONTENTMANAGEMENT_STITCHES)
    }
    catch(error){
      console.error(error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Adding stitch or pattern..');

    if(id){
      editStitch();
    }
    else{
      createStitch();
    }

  }

  useEffect(()=>{
    const fetchDoc = async() =>{
      try{  
        const stitchData = await getItemInCollection(id, 'stitches');    
        if(!stitchData){
          navigate(STITCHES_INDEX);
        }
        //Convert Stitch List to Id List
        const stitchesCombinationIds = stitchData.combination.map((stitch)=>(stitch.id));
        setStitchId(id);
        setStitchName(stitchData.name);
        setDescription(stitchData.description);
        setStitchType(stitchData.type);
        setContributedBy(stitchData.contributedBy);
        setDifficulty(stitchData.difficulty);
        setPicAuthor(stitchData.picture.author);
        setCombinationIds(stitchesCombinationIds)
        setTutorialLink(stitchData.tutorial);
        setCurrentPicUrl(stitchData.picture.url);
        setPictureUrl(stitchData.picture.url);
      }
      catch(err){
        console.error(err);
        navigate(STITCHES_INDEX);
      }
    }
    if(id){
      fetchDoc();
    }
    
  },[])

  return (

    <div className='form-container section-container'>
      <h1 className='title'>{stitchId === '' ? 'Create' : 'Edit'} Stitch</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label htmlFor='stitch-name'>Stitch Name</label>
        <input id='stitch-name' name='stitch-name' value={stitchName} onChange={e => setStitchName(e.target.value)} type='text' required></input>
        
        <div className='flex-container flex-small-gap'>
          <div>
            <h4>Picture</h4>
            <img className='fit-picture' src={pictureUrl !== '' ? pictureUrl : imageNotFoundPath} alt='stitch'/>
          </div>
          {!previewPicture ? <div></div> :
            <div>
              <h4>New Picture</h4>
              <img src={previewPicture} className='fit-picture' alt='Preview of new stitch'/>
            </div> 
          }
        </div>
        <label htmlFor='stitch-picture'>{stitchId === '' ? 'Choose a ' : 'Change '}Picture file</label>
        <input id='stitch-picture' type='file' onChange={(e)=>{
            setStitchPicture(e.target.files[0])
            console.log(URL.createObjectURL(e.target.files[0]))
            setPreviewPicture(URL.createObjectURL(e.target.files[0]))
          }}/>

        <label htmlFor='stitch-description'>Description</label>
        <textarea id='stitch-description' name='stitch-description' value={stitchDescription} rows='3' cols='50'
        placeholder='This stitch is ...'
        onChange={e => setDescription(e.target.value)}></textarea>

        <label htmlFor='stitch-type' >Stitch Type</label>
        <select id='stitch-type' value={stitchType} onChange={e => setStitchType(e.target.value)} required>
          <option value="" disabled>--Select Type--</option>
          <option value="basic">Basic</option>
          <option value="combination">Combination</option>   
        </select>

        <label htmlFor='stitch-difficulty'>Difficulty</label>
        <select id='stitch-difficulty' value={stitchDifficulty} onChange={e=> setDifficulty(e.target.value)} required>
          <option value="" disabled>--Select Difficulty--</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="expert">Expert</option>
        </select>
        
        <label htmlFor='stitch-picauthor'>Picture Author</label>
        <input id='stitch-picauthor' value={picAuthor} type='text' onChange={e => setPicAuthor(e.target.value)} required/>

        <label htmlFor='stitch-contribution'>Contribution by</label>
        <input id='stitch-contribution' value={stitchContributedBy} type='text' onChange={e => setContributedBy(e.target.value)} required/>

        <label htmlFor='stitch-combination' className='label'>Stitches</label>
        <div className='flex-container flex-small-gap'>
          <select value={combinationIds} id='stitch-combination' multiple onChange={handleSelectCombination}>
            <option value='' disabled>--Select stitches--</option>
            {
              stitches_data.stitches_icons.map((stitch) => (
                <option key={stitch.id} value={stitch.id}>{stitch.name}</option>
              ))
            }
          </select>
        </div>
        <div className='tags'>
          {
            selectedStitchesCombination.map((item, index) => (
              <div className='tag' key={index}>
                <p>{item.name}</p>
                <p>{item.abbreviation}</p>
                <p>{item.icon}</p>
                <Button
                  content={<IoMdClose/>}
                  styleType='outline' variant='destructive' use='icon' size='small'
                  onClick={() => removeStitchFromCombination(index)} />
              </div>
            ))
          }
        </div>
        
        <label htmlFor='stitch-tutorial'>Video Tutorial Link</label>
        <input id='stitch-tutorial' value={tutorialLink} type='text' onChange={e => setTutorialLink(e.target.value)}/>

        <div className='buttons-line'>
          <input className={`${buttonStyles.btn} ${buttonStyles.filled} ${buttonStyles.secondary} ${buttonStyles.medium}`}
            type='submit'
            value={stitchId === '' ? 'Create' : 'Save Changes'}/>
          <Button
            content='Back'
            styleType='outline' variant='secondary'
            onClick={() => navigate(CONTENTMANAGEMENT_STITCHES)}/>
        </div>
        
      </form>

    </div>
  )
}

export default Upsert