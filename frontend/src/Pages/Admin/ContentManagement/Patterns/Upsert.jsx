import React from 'react'

// Picture
// Name
// Description
// Difficulty
// Materials
// Written Pattern In the future. Instructions
// Link to Video tutorial

const Upsert = () => {
  return (
    <div className='form-container'>
      <h1 className='title'>Add New Pattern</h1>
      <form>
        <label htmlFor='pattern-name'>Name</label>
        <input id='pattern-name'/>

        <label>Picture</label>
        <input></input>

        <label htmlFor='pattern-description'>Description</label>
        <textarea id='pattern-description' placeholder='This pattern is ...' rows='3' cols='50'></textarea>

        <label htmlFor="difficulty">Difficulty</label>
        <select id='difficulty' name='difficulty'>
        <option value="" disabled>--Select Type--</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <label htmlFor='pattern-materials'>Materials</label>
        <textarea id='pattern-materials' rows='3' cols='50'></textarea>

        <label htmlFor='pattern-lines'>Pattern</label>
        <textarea id='pattern-lines' rows='3' cols='50'></textarea>

        <label htmlFor='pattern-video'>Link to video</label>
        <input id='pattern-video'></input>
      </form>
    </div>
  )
}

export default Upsert