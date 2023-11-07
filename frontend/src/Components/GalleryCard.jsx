import React, { useState } from 'react'

const GalleryCard = ({ stitchName = 'Stitch' }) => {
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
                        <h2>{stitchName}</h2>
                        <p>Basic</p>
                    </div>) :
                    (<div className='swatch-details back'>
                        <div>
                            <h2>{stitchName}</h2>
                            <p>Description</p>
                        </div>
                    </div>)
            }
        </div>


    )
}

export default GalleryCard