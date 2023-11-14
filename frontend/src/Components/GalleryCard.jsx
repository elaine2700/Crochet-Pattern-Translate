import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const GalleryCard = ({ cardName = 'Stitch', linkTo }) => {
    const [hoverState, setHoverState] = useState(false);

    const handleHoverState = (e, enter) => {
        setHoverState(enter);
        console.log(hoverState);
        console.log(`Hover ${e.target}`)
    }

    return (
        <div
            style={{ backgroundImage: `url('logo192.png')` }}
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
                        <div>
                            <h2>{cardName}</h2>
                            <Link
                                to={linkTo}
                                className='btn-secondary'>
                                More
                            </Link>
                        </div>
                    </div>)
            }
        </div>


    )
}

export default GalleryCard