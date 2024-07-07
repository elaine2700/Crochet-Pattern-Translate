import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { imagesStitchesFolderRef } from '../../../../config/firebase'
import { uploadImage, deleteImage } from '../content_service';

import { collection, addDoc, getDoc, doc, updateDoc} from 'firebase/firestore'
import { db, storage } from '../../../../config/firebase'

import buttonStyles from '../../../../Components/Buttons/buttons.module.css'
import Button from '../../../../Components/Buttons/Button'
import { CONTENTMANAGEMENT_STITCHES } from '../../../../config/links_path';

import { IoAdd } from 'react-icons/io5';
import {IoMdClose} from 'react-icons/io';

const Upsert = () => {
  const imageNotFoundPath = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
  const {id} = useParams();
  const navigate = useNavigate()
  const stitchesCollection = collection(db, 'stitches');

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
  const [combination, setCombination] = useState({
    name: "",
    abbreviation: "",
    icon: "",
    list: []
  });

  const handleCombinationChange = (event) =>{
    const {name, value} = event.target;
    setCombination({
      ...combination,
      [name] : value
    })
  }
  const addStitchToCombination = () =>{
    if(combination.name && combination.abbreviation && combination.icon) {
      const newStitch = {
        name : combination.name,
        abbreviation: combination.abbreviation,
        icon: combination.icon
      }
      setCombination({
        ...combination,
        list: [...combination.list, newStitch],
        name: '',
        abbreviation: '',
        icon: ''
      });
    }
  }
  const removeStitchFromCombination = (index) =>{
    const updatedCombinationList = combination.list.filter((item, i) => i !== index);
    setCombination({
      ...combination,
      list: updatedCombinationList
    });
  }
  
  const editStitch = async() =>{
    console.log('Editing the stitch');
    console.log(currentPicUrl);
    console.log(pictureUrl);
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

    console.log(updatedUrl);
    try{
      const docRef = doc(db,'stitches', id);
      await updateDoc(docRef,{
        combination: combination.list,
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
      });
      console.log("Document updated with ID: ", docRef.id);
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
      // Handle error
      return;
    }

    try{
      const docRef = await addDoc((stitchesCollection),{
        combination: combination.list,
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
      });
      console.log("Document written with ID: ", docRef.id);
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
        const docRef = doc(db,'stitches', id);
        const data = await getDoc(docRef);
        const stitchData = data.data();
        
        setStitchId(id);
        setStitchName(stitchData.name);
        setDescription(stitchData.description);
        setStitchType(stitchData.type);
        setContributedBy(stitchData.contributedBy);
        setDifficulty(stitchData.difficulty);
        setPicAuthor(stitchData.picture.author);
        setCombination({
          ...combination,
          abbreviation: '',
          name: '',
          icon: '',
          list: [...stitchData.combination]
        })
        setTutorialLink(stitchData.tutorial);
        setCurrentPicUrl(stitchData.picture.url);
        setPictureUrl(stitchData.picture.url);
      }
      catch(err){
        console.error(err);
      }
    }
    if(id){
      fetchDoc();
    }
    
  },[])

  return (

    <div className='form-container section-container'>
      <h1 className='title'>{stitchId == '' ? 'Create' : 'Edit'} Stitch</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label htmlFor='stitch-name'>Stitch Name</label>
        <input id='stitch-name' name='stitch-name' value={stitchName} onChange={e => setStitchName(e.target.value)} type='text' required></input>
        
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
        <label htmlFor='stitch-picture'>{stitchId == '' ? 'Choose a ' : 'Change '}Picture file</label>
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

        <p className='label'>Stitches</p>
        <div className='flex-container flex-small-gap'>
          <input name='name' value={combination.name} placeholder='Stitch name' onChange={handleCombinationChange}/>
          <input name='abbreviation' value={combination.abbreviation} placeholder='Stitch abbreviation' onChange={handleCombinationChange} />
          <input name='icon' value={combination.icon} placeholder='Stitch icon-url' onChange={handleCombinationChange}/>
          <Button
            content={<IoAdd/>}
            styleType='outline' variant='secondary' use='icon'
            onClick={addStitchToCombination}/>
        </div>
        <div className='tags'>
          {
            combination.list.map((item, index) => (
              <div className='tag flex-container flex-small-gap' key={index}>
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
            value={stitchId == '' ? 'Create' : 'Save Changes'}/>
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