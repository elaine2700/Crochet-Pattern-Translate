import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Create = () => {

  const [stitchName, setStitch] = useState('Popcorn')
  const [stitchType, setStitchType] = useState('Combination');

  const handleCreation = () => {
    console.log('Adding stitch or pattern..')

    const data = {
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
    /*const data = {
      stitchName,
      stitchType
    }*/


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
    <div>
      <button onClick={handleCreation}>Add pattern</button>
      <button onClick={handleCreation}>Add stitch</button>
    </div>
  )
}

export default Create