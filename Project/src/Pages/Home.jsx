import HomeCard from '../Components/Home/HomeCard'

const Home = () => {
    const stitchesCardSettings = {
        imgPath: 'images/dog-bear.jpg',
        buttonText: 'Stitches',
        linkTo: '/stitches'
    }

    const patternCardSettings = {
        imgPath: 'images/Koala_Pattern_00.jpg',
        buttonText: 'Patterns',
        linkTo: '/patterns'
    }

    return (
        <section className='home-section section-container'>
            <div>
                <header>
                    <h1 className='home-title'>A crochet database</h1>
                    <h2 className='home-subtitle'>Made by and for crochet lovers</h2>
                </header>

                <div className='homesection-grid'>
                    <HomeCard settings={stitchesCardSettings} />
                    <HomeCard settings={patternCardSettings} />
                </div>
            </div>
        </section>
    )
}

export default Home