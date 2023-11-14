import React from 'react'

const StitchDetail = () => {
    return (

        <div className='detail-section'>
            <div
                className='fit-picture'
                style={{ backgroundImage: `url('logo512.png')` }}>
            </div>
            <section className='detail-content'>
                <header>
                    <h1>Stitch Name</h1>
                </header>
                <article>
                    <p>Description</p>
                    <p>
                        Difficulty; Medium
                    </p>
                    <p>Combination: sc, dc, ss</p>
                    <img src='logo192.png'/>
                    <p>Instructions</p>
                    <p>Link to video Tutorial</p>
                </article>
            </section>
        </div>


    )
}

export default StitchDetail