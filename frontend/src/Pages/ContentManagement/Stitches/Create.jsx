import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Create = () => {
  const navigate = useNavigate()

  const [stitchName, setStitchName] = useState('')
  const [description, setDescription] = useState('')
  const [stitchType, setStitchType] = useState('');
  const [contributedBy, setContributedBy] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [stitchPicture, setStitchPicture] = useState('');
  const [picAuthor, setPicAuthor] = useState('');
  const [combinationText, setCombinationText] = useState("");
  const [tutorialLink, setTutorialLink] = useState('');

  const separateCommas = (text) =>{
    return text.split(',');
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    console.log('Adding stitch or pattern..');

    const combination = separateCommas(combinationText);


    const data = {
      stitchName,
      description,
      stitchType,
      contributedBy,
      difficulty,
      picture:{
        stitchPicture,
        picAuthor
      },
      combination,
      tutorialLink
    }

    console.log(data);

    /*const dummyData = {
      stitchName: 'Moss Stitch',
      stitchType: 'Combination',
      abbreviation: '',
      contributionBy: 'Crochet Spacecraft',
      difficulty: 'Medium',
      picture: {
        src: 'logo192.png',
        picAuthor: 'Andre'
      },
      stitchesCombination:[{stitch:'sc'},{stitch:'dc'}],
      textTutorial: 'do this, then do that',
      videoTutorial: 'video Link'
    }
    */
   
    


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
      <h1 className='title'>Add Stitch</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='stitch-name'>Stitch Name</label>
        <input id='stitch-name' name='stitch-name' value={stitchName} onChange={e => setStitchName(e.target.value)} type='text' required></input>

        <label htmlFor='stitch-description'>Description</label>
        <textarea id='stitch-description' name='stitch-description' value={description} rows='3' cols='50'
        placeholder='This stitch is ...'
        onChange={e => setDescription(e.target.value)}></textarea>

        <label htmlFor='stitch-type' >Stitch Type</label>
        <select id='stitch-type' value={stitchType} onChange={e => setStitchType(e.target.value)}>
          <option value="" disabled>--Select Type--</option>
          <option value="basic">Basic</option>
          <option value="combination">Combination</option>   
        </select>

        <label htmlFor='stitch-difficulty'>Difficulty</label>
        <select id='stitch-difficulty' value={difficulty} onChange={e=> setDifficulty(e.target.value)}>
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
        <input id='stitch-contribution' value={contributedBy} type='text' onChange={e => setContributedBy(e.target.value)}/>

        {/*Separate values with comma*/}
        <label htmlFor='stitch-combination'>Stitches Combination. Separate values with comma</label>
        <input id='stitch-combination' value={combinationText} type='text' onChange={e=> setCombinationText(e.target.value)} />

        <label htmlFor='stitch-tutorial'>Video Tutorial Link</label>
        <input id='stitch-tutorial' value={tutorialLink} type='text' onChange={e => setTutorialLink(e.target.value)}/>


        <div className='buttons-line'>
          <input className='btn-secondary' type='submit' value='Submit'/>
          <button className='btn-secondary-outline'>Back</button>
        </div>
        
      </form>

    </div>
  )
}

export default Create