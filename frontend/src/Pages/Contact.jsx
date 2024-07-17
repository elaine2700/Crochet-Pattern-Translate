import LinkButton from "../Components/Buttons/LinkButton"

const Contact = () => {
  // TODO Set up Donate Button

  return (

    <div className='contact-section section-container'>
      <section className='contact-card'>
        <header>
          <h2>Contact</h2>
        </header>
        <div className='contact-card-content'>
          <div className='contact-card-img mask contact'>
            <div className='fill bg-blue'></div>
          </div>
          <p className='contact-card-paragraph'>Send us and email to let us know about you.</p>
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
          <div className='contact-card-img mask contribute'>
            <div className='fill bg-blue'></div>
          </div>
          <p className='contact-card-paragraph'>
            This community is possible thanks to kind volunteers like you. Help us make better for everyone
            <br/> Fill this form to add more stitches and patterns to the catalog.
            </p>
          <div className='contact-card-cta'>
            <LinkButton to='https://forms.gle/5Edsqx3jM2rj6MWr7'
            content='Get started' target='_blank'/>
          </div>
        </div>
        
      </section>
      <section className='contact-card'>
        <header>
          <h2>Donate</h2>
        </header>
        <div className='contact-card-content'>
          <div className='contact-card-img mask donate'>
            <div className='fill bg-blue'></div>
          </div>
          <p className='contact-card-paragraph'>
            Help us create new resources for you to use to expand your crochet skills.
          </p>
          <div className='contact-card-cta'>
            <button className='btn-primary'>Donate</button>
          </div>
          
        </div>
        
      </section>
    </div>
  )
}

export default Contact