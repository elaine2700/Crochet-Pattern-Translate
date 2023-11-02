import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

function App() {

  const [sourceLanguage, setSourceLanguage] = useState('English-US');
  const [translationLanguage, setTranslationLanguage] = useState('English-US');
  const [sourceStitch, setSourceStitch] = useState('SingleCrochet');

  const handleSubmitStitch = ()=> {
    console.log('Submitting data');
    console.log(sourceLanguage);
    console.log(translationLanguage);
    console.log(sourceStitch);
  };

  const tempListLanguages = ['English-US', 'English-UK', 'Spanish', 'French', 'German']

  // todo List available dictionaries
  // todo Load dictionaries
  // todo Load stitches from dictionary

  return (
    <div>

      <form>
        <div className="form-group">
          <label htmlFor="source-language">From</label>
          <select 
            className="form-control" 
            id="source-language"
            onChange={(event)=> setSourceLanguage(event.target.value)}>
            {
              tempListLanguages.map((lang, index) => (
                <option key={index} value={lang}>{lang}</option>
              ))
            }
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="translate-language">To</label>
          <select
           className="form-control" 
           id="translate-language"
           onChange={(event) => setTranslationLanguage(event.target.value)}>
            {
              tempListLanguages.map((lang, index) => (
                <option key={index} value={lang}>{lang}</option>
              ))
            }
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="source-stitch">Stitch</label>
          <select
          className="form-control"
          id="source-stitch"
          onChange={(event)=> setSourceStitch(event.target.value)}>
            <option value='sc'>Single Crochet</option>
            <option value='ss' >Slip Stitch</option>
            <option value='hdc'>Half Double Crochet</option>
            <option value='dc'>Double Crochet</option>
            <option value='trc'>Triple Crochet</option>
          </select>
        </div>

        <div className="form-group">
          <p>Result</p>
          <p>hdc</p>
        </div>

      </form>
      <button onClick={handleSubmitStitch}>Translate</button>

    </div>
  );
}

export default App;
