import BuyMeACoffeeButton from "../Components/Buttons/BuyMeACoffeeButton"
import LinkButton from "../Components/Buttons/LinkButton"
import { Link } from "react-router-dom"

const Contact = () => {
  // TODO Add mailto (and real email)
  return (

    <div className='section-container contact-section'>
      <section className='contact-card'>
        <header>
          <h2>Contact</h2>
        </header>
        <div className='contact-card-content'>
          <div className='contact-card-img mask contact'>
            <div className='fill bg-blue'></div>
          </div>
          <p className='contact-card-paragraph'>See more about Crochet Spacecraft on Instagram, and send us a message!</p>
          <div className='contact-card-cta'>
            <LinkButton to='https://www.instagram.com/crochet_spacecraft/' 
            content='Follow Crochet_Spacecraft' target='_blank'/>
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
            This community is possible thanks to kind volunteers like you.
            <br/> Fill this form to add more stitches and patterns to the catalog.
            </p>
          <div className='contact-card-cta'>
            <LinkButton to='https://forms.gle/5Edsqx3jM2rj6MWr7'
            content='Add a pattern' target='_blank'/>
            <LinkButton to='https://forms.gle/aAHJYdJ2imDgvb9z7'
            content='Add a stitch' target='_black' />
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