import React from 'react'

const Create = () => {
    const handleCreation = ()=>{
        console.log('Adding stitch or pattern..')
    }
  return (
    <div>
        <button onClick={handleCreation}>Add pattern</button>
        <button onClick={handleCreation}>Add stitch</button>
    </div>
  )
}

export default Create