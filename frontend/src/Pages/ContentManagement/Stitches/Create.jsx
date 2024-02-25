import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../config/firebase'

import buttonStyles from '../../../Components/Buttons/buttons.module.css'
import Button from '../../../Components/Buttons/Button'

const Create = () => {

  const navigate = useNavigate()
  const stitchesCollection = collection(db, 'stitches');

  const [stitchName, setStitchName] = useState('')
  const [stitchDescription, setDescription] = useState('')
  const [stitchType, setStitchType] = useState('');
  const [stitchContributedBy, setContributedBy] = useState('');
  const [stitchDifficulty, setDifficulty] = useState('');
  const [stitchPicture, setStitchPicture] = useState('');
  const [picAuthor, setPicAuthor] = useState('');
  const [combinationText, setCombinationText] = useState("");
  const [tutorialLink, setTutorialLink] = useState('');

  const separateCommas = (text) =>{
    return text.split(',');
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    console.log('Adding stitch or pattern..');

    const _combination = separateCommas(combinationText);

    const data = {
      combination: _combination,
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
          url: ""
        },
        tutorial: tutorialLink,
        type: stitchType
    }

    console.log(data);

    // TODO Send data to firebase;

    try{
      const docRef = await addDoc((stitchesCollection),{
        combination: _combination,
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
          url: ""
        },
        tutorial: tutorialLink,
        type: stitchType
      });
      console.log("Document written with ID: ", docRef.id);
      navigate('/content-management/stitches')
    }
    catch(error){
      console.error(error);
      // TODO Navigate to Oops Page or Add Notification PopUp
    }

    /*
    axios
      .post('http://localhost:3030/stitches', data)
      .then(() => {
        console.log('Book Created Succesfully')
      })
      .catch((error) => {
        console.log('Oops...')
        console.log(error);
      })
    */
  }

  return (

    <div className='container'>
      <h1 className='title'>Create Stitch</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='stitch-name'>Stitch Name</label>
        <input id='stitch-name' name='stitch-name' value={stitchName} onChange={e => setStitchName(e.target.value)} type='text' required></input>

        <label htmlFor='stitch-description'>Description</label>
        <textarea id='stitch-description' name='stitch-description' value={stitchDescription} rows='3' cols='50'
        placeholder='This stitch is ...'
        onChange={e => setDescription(e.target.value)}></textarea>

        <label htmlFor='stitch-type' >Stitch Type</label>
        <select id='stitch-type' value={stitchType} onChange={e => setStitchType(e.target.value)}>
          <option value="" disabled>--Select Type--</option>
          <option value="basic">Basic</option>
          <option value="combination">Combination</option>   
        </select>

        <label htmlFor='stitch-difficulty'>Difficulty</label>
        <select id='stitch-difficulty' value={stitchDifficulty} onChange={e=> setDifficulty(e.target.value)}>
          <option value="" disabled>--Select Difficulty--</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="expert">Expert</option>
        </select>

        {
          /*
          <label>Upload a picture</label>
          <input type='file' onChange={}/>
          */
        }
        
        <label htmlFor='stitch-picauthor'>Picture Author</label>
        <input id='stitch-picauthor' value={picAuthor} type='text' onChange={e => setPicAuthor(e.target.value)}/>

        <label htmlFor='stitch-contribution'>Contribution by</label>
        <input id='stitch-contribution' value={stitchContributedBy} type='text' onChange={e => setContributedBy(e.target.value)}/>

        {/*Separate values with comma*/}
        <label htmlFor='stitch-combination'>Stitches Combination. Separate values with comma</label>
        <input id='stitch-combination' value={combinationText} type='text' onChange={e=> setCombinationText(e.target.value)} />

        <label htmlFor='stitch-tutorial'>Video Tutorial Link</label>
        <input id='stitch-tutorial' value={tutorialLink} type='text' onChange={e => setTutorialLink(e.target.value)}/>


        <div className='buttons-line'>
          <input className={`${buttonStyles.btn} ${buttonStyles.btnFilled} ${buttonStyles.btnSecondary}`}
            type='submit'
            value='Submit'/>
          <Button
            content='Back'
            type='outline' variant='secondary'
            onClick={() => navigate('/content-management/stitches')}/>
        </div>
        
      </form>

    </div>
  )
}

export default Create