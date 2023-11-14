import React from 'react'

const Contact = () => {
  return (
    <div className='contact-section section-container'>
      <div className='contact-card'>
        <p>Contact us here</p>
        <a>email@email.com</a>
      </div>
      <div className='contact-card'>
      <p>Contribute. Send us a message here</p>
        <a>email@email.com</a>
      </div>
      <div className='contact-card'>
        <p>Donate to keep this database alive</p>
        <button className='btn-primary'>Donate</button>
      </div>
    </div>
  )
}

export default Contact