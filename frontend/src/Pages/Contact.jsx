import React from 'react'

const Contact = () => {
  return (
    <div className='contact-section section-container'>
      <section className='contact-card'>
        <header>
          <h2>Contact</h2>
        </header>
        <div className='contact-card-content'>
          <p className='contact-card-paragraph'>Contact us here</p>
          <div className='contact-card-cta'>
            <a>contact@crochetspacecraft.com</a>
          </div>
        </div>
        
      </section>
      <section className='contact-card middle'>
        <header>
          <h2>Contribute</h2>
        </header>
        <div className='contact-card-content'>
          <p className='contact-card-paragraph'>Contribute. Send us a message here</p>
          <div className='contact-card-cta'>
            <a>contribute@crochetspacecraft.com</a>
          </div>
        </div>
        
      </section>
      <section className='contact-card'>
        <header>
          <h2>Donate</h2>
        </header>
        <div className='contact-card-content'>
          <p className='contact-card-paragraph'>Donate to keep this database alive</p>
          <div className='contact-card-cta'>
            <button className='btn-primary'>Donate</button>
          </div>
          
        </div>
        
      </section>
    </div>
  )
}

export default Contact