import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const GalleryCard = ({ cardName = 'Stitch', linkTo }) => {
    const [hoverState, setHoverState] = useState(true);

    const handleHoverState = (e, enter) => {
        //setHoverState(enter);
        console.log(hoverState);
        console.log(`Hover ${e.target}`)
    }

    return (
        <div
            style={{ backgroundImage: `url('dog-bear.jpg')` }}
            className='stitch-swatch'
            onMouseEnter={(e) => handleHoverState(e, true)}
            onMouseLeave={(e) => handleHoverState(e, false)}>
            {
                !hoverState ?
                    (<div className='swatch-details'>
                        <h2>{cardName}</h2>
                        <p>Basic</p>
                    </div>) :
                    (<div className='swatch-details back'>
                        
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