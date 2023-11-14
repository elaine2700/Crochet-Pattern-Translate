import React from 'react'

const PatternDetail = () => {
  return (
    <div className='detail-section'>
            <div
                className='fit-picture'
                style={{ backgroundImage: `url('logo512.png')` }}>
            </div>
            <section className='detail-content'>
                <header>
                    <h1>Pattern Name</h1>
                </header>
                <article>
                    <p>Description</p>
                    <p>
                        Difficulty; Medium
                    </p>
                    <p>Link to video Tutorial</p>
                    <h2>Written Pattern</h2>

                    <h2>Materials</h2>
                    <ul>
                        <li>Material 1</li>
                        <li>Material 2</li>
                    </ul>
                    <h2>Instructions</h2>
                    <p>Pattern Content</p>
                    <img src='logo192.png'/>
                    
                </article>
            </section>
        </div>
  )
}

export default PatternDetail