import React from 'react'
import HomeCard from '../Components/Home/HomeCard'

const Home = () => {
    const stitchesCardSettings = {
        imgPath: 'favicon.ico',
        buttonText: 'Stitches',
        linkTo: '/stitches'
    }

    const patternCardSettings = {
        imgPath: 'favicon.ico',
        buttonText: 'Patterns',
        linkTo: '/patterns'
    }

    return (
        <section className='padding section-container'>
            <div className='fit'>
                <h1 className='home-title'>A crochet database made by and for crochet lovers</h1>
                <div className='two-column-grid'>
                    <HomeCard settings={stitchesCardSettings} />
                    <HomeCard settings={patternCardSettings} />
                </div>
            </div>

        </section>
    )
}

export default Home