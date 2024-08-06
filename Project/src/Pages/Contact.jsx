import BuyMeACoffeeButton from "../Components/Buttons/BuyMeACoffeeButton"
import LinkButton from "../Components/Buttons/LinkButton"

const Contact = () => {

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
          <h2>Support</h2>
        </header>
        <div className='contact-card-content'>
          <div className='contact-card-img mask donate'>
            <div className='fill bg-blue'></div>
          </div>
          <p className='contact-card-paragraph'>
            Thank you for contributing with some "yarn", it's a great way to help us to create new resources for you and expand everyone's crochet skills.
          </p>
          <div className='contact-card-cta'>
            <BuyMeACoffeeButton/>
          </div>
          
        </div>
        
      </section>
    </div>
  )
}

export default Contact