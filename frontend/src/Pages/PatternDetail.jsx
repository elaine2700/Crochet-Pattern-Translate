import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FaSquare } from 'react-icons/fa'

const PatternDetail = () => {
  return (
    <div className='detail-section'>
        <div
            className='fit-picture'
            style={{ backgroundImage: `url('logo512.png')` }}>
        </div>
        <section className='detail-content'>
            <header className='header'>
                <h1>Pattern Name</h1>
            </header>
            
            <h2 className='subtitle'>Author</h2>
            <div className='area'>
                <a>Andre <FaExternalLinkAlt/></a>
            </div>

            <h2 className='subtitle'>Description</h2>
            <p className='area'>Brief description of pattern</p>

            <h2 className='subtitle'>Difficulty</h2>
            <p className='area'>Medium</p>

            <h2 className='subtitle'>Materials</h2>
            <div className='area pattern-materials-area'>
                <div className='cell'>
                    <div className='tags'>
                        <div className='rounded-icon'>
                            <img style={{width: '100%'}} src='/single.png' alt='hook icon'/>
                        </div>
                        <div>
                            <p>Hook</p>
                            <p className='font-bold'>0.5mm</p>
                        </div>
                    </div>
                </div>
                <div className='cell'>
                    <div>
                        <h3 className='font-bold'>Yarn Colors</h3>
                        <ul className='list-nodecoration'>
                            <li><span style={{color: '#fff'}}><FaSquare/></span> Color 1</li>
                            <li><FaSquare/> Color 2</li>
                        </ul>
                    </div>
                </div>
                <div className='cell'>
                    <div>
                        <h3 className='font-bold'>Other</h3>
                        <ul>
                            <li>Other 1</li>
                            <li>Other 2</li>
                        </ul>
                    </div>
                </div>     
                
            </div>

            <h2 className='subtitle'>Abbreviations</h2>
            <div className='area'>
                <ul className='tags'>
                    <li className='tag pattern-tag'>
                        <p className='font-bold'>ch</p>
                        <p>chain</p>
                    </li>
                    <li className='tag pattern-tag'>
                        <p className='font-bold'>sc</p>
                        <p>single crochet</p>
                    </li>
                </ul>
            </div>

            <h2 className='subtitle'>Pattern</h2>
            <p className='area'>Pattern Content Lorem ipsum aglajglafjasfasjdlfaslsafjas fa aglajglafjasfasjdlfaslsafjaslafjlasj 
            a;lfjalsdkfj af dfj asfj asf akdjfjfiefkj ejfa ieaiefjiefa jfiejfa;ef iejfiea 
            afjeifjaief jfiaewfiawejfiewji jofiejafiejf awf  jaeoijfeiwof eifjaoewifjwoafi efiaeiofjaef jeoiafjiefj  eifajoewifawoie 
            ajeifjaiejfeiwf eifjaeifjeif
            eaifjeiafeoife
            jeo;iafjeifjfjaief iefjiejfiaef;aoewifaewif iejfaoiewjfaoiwefjeiwjfoawfe. eioajfoeijfiaewjfaw
            jieajoefjewaoifjaowifjweijfe iajeoiajfei fjaiefjoa. aoeifjaoifej.
            Pattern Content Lorem ipsum aglajglafjasfasjdlfaslsafjas fa aglajglafjasfasjdlfaslsafjaslafjlasj 
            a;lfjalsdkfj af dfj asfj asf akdjfjfiefkj ejfa ieaiefjiefa jfiejfa;ef iejfiea 
            afjeifjaief jfiaewfiawejfiewji jofiejafiejf awf  jaeoijfeiwof eifjaoewifjwoafi efiaeiofjaef jeoiafjiefj  eifajoewifawoie 
            ajeifjaiejfeiwf eifjaeifjeif
            eaifjeiafeoife
            jeo;iafjeifjfjaief iefjiejfiaef;aoewifaewif iejfaoiewjfaoiwefjeiwjfoawfe. eioajfoeijfiaewjfaw
            jieajoefjewaoifjaowif.
            Pattern Content Lorem ipsum aglajglafjasfasjdlfaslsafjas fa aglajglafjasfasjdlfaslsafjaslafjlasj 
            a;lfjalsdkfj af dfj asfj asf akdjfjfiefkj ejfa ieaiefjiefa jfiejfa;ef iejfiea 
            afjeifjaief jfiaewfiawejfiewji jofiejafiejf awf  jaeoijfeiwof eifjaoewifjwoafi efiaeiofjaef jeoiafjiefj  eifajoewifawoie 
            ajeifjaiejfeiwf eifjaeifjeif
            eaifjeiafeoife
            jeo;iafjeifjfjaief iefjiejfiaef;aoewifaewif iejfaoiewjfaoiwefjeiwjfoawfe. eioajfoeijfiaewjfaw
            jieajoefjewaoifjaowif.
            Pattern Content Lorem ipsum aglajglafjasfasjdlfaslsafjas fa aglajglafjasfasjdlfaslsafjaslafjlasj 
            a;lfjalsdkfj af dfj asfj asf akdjfjfiefkj ejfa ieaiefjiefa jfiejfa;ef iejfiea 
            afjeifjaief jfiaewfiawejfiewji jofiejafiejf awf  jaeoijfeiwof eifjaoewifjwoafi efiaeiofjaef jeoiafjiefj  eifajoewifawoie 
            ajeifjaiejfeiwf eifjaeifjeif
            eaifjeiafeoife
            jeo;iafjeifjfjaief iefjiejfiaef;aoewifaewif iejfaoiewjfaoiwefjeiwjfoawfe. eioajfoeijfiaewjfaw
            jieajoefjewaoifjaowif
            </p>

            <h2 className='subtitle'>Tutorial</h2>
            <div className='area'>
                <a href='#'
                    target='_blank'
                    rel="noopener noreferrer">
                        Link <FaExternalLinkAlt/>
                </a> 
            </div>
        </section>
    </div>
  )
}

export default PatternDetail