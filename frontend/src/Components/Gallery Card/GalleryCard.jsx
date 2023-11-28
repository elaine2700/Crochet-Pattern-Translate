import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cardStyles from './gallerycard.module.css'

const GalleryCard = ({ cardName = 'Stitch', linkTo }) => {
    const [hoverState, setHoverState] = useState(false);

    const handleHoverState = (e, enter) => {
        setHoverState(enter);
        console.log(hoverState);
        console.log(`Hover ${e.target}`)
    }

    return (
        <div
            style={{ backgroundImage: `url('dog-bear.jpg')` }}
            className={cardStyles.swatch}
            onMouseEnter={(e) => handleHoverState(e, true)}
            onMouseLeave={(e) => handleHoverState(e, false)}>
            {
                !hoverState ?
                    (<div className={cardStyles.details}>
                        <h2>{cardName}</h2>
                        <p>Basic</p>
                    </div>) :
                    (<div className={`${cardStyles.details} ${cardStyles.back}`}>
                        
                        <h2>{cardName}</h2>
                        <p>Basic</p>
                        <Link
                            to={linkTo}
                            className='btn-primary'>
                            See Details
                        </Link>
                        
                    </div>)
            }
        </div>


    )
}

export default GalleryCard