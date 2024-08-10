import { useState, useEffect, useRef } from 'react'
import buttonStyles from '../../../../Components/Buttons/buttons.module.css'
import Button from '../../../../Components/Buttons/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { CONTENTMANAGEMENT_PATTERNS } from '../../../../config/links_path'
import { createObjectInDatabase, getItemInCollection, uploadImage, deleteImage, updateObjectInDatabase } from '../content_service'
import { imagesPatternsFolderRef, storage } from '../../../../config/firebase'
import {IoMdClose} from 'react-icons/io';
import {IoAdd} from 'react-icons/io5';
import {stitches_icons} from '../../../../data/stitches_data'
import RichTextEditor from '../../../../Components/RichTextEditor/RichTextEditor'

const Upsert = () => {
  const navigate = useNavigate();
  const imageNotFoundPath = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
  const {id} = useParams();

  const [patternId, setPatternId] = useState('');
  const [patternName, setPatternName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [patternAuthor, setPatternAuthor] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [hookSize, setHookSize] = useState(0);
  const [others, setOthers]= useState([]);
  const [pattern, setPattern]= useState('');
  const [videoTutorial, setVideoTutorial] = useState('');
  const [selectedStitchesIds, setSelectedStitchesIds] = useState([]);
  // Picture Variables
  const [previewNewPicture, setPreviewNewPicture] =useState(null);
  const [currentPictureUrl, setCurrentPictureUrl] = useState('');
  const [patterPictureFile, setPatternPictureFile] = useState(null);
  
  // Colors
  const [yarnColors, setYarnColors] = useState({
    nameInput: "",
    codeInput: "",
    colors: []
  })
  const handleYarnColorInputChange = (e) => {
    const {name , value} = e.target;
    setYarnColors({
      ...yarnColors,
      [name] : value
    });
  };
  // Abbreviations
  const [abbreviations, setAbbreviations] = useState({
    abbreviation: '',
    description: '',
    list: []
  })
  const handleAbbreviationInputChange = (event) => {
    const {name, value} = event.target;
    setAbbreviations({
      ...abbreviations,
      [name] : value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(id){
      await EditPattern();
    }else{
      await createPattern();
    }
    navigate(CONTENTMANAGEMENT_PATTERNS);
  }

  const addYarnColor = () => {
    if(yarnColors.nameInput && yarnColors.codeInput) {
      const newColor = {
        name: yarnColors.nameInput,
        code: yarnColors.codeInput
      };
      setYarnColors({
        ...yarnColors,
        colors: [...yarnColors.colors, newColor],
        nameInput: '',
        codeInput: ''
      });
    }
  }
  const removeYarnColor = (index) =>{
    const updatedColors = yarnColors.colors.filter((colorItem, i) => i !== index);
    setYarnColors({
      ...yarnColors,
      colors: updatedColors
    });
  }
  const addAbbreviation = () => {
    if(abbreviations.description && abbreviations.abbreviation){
      const newStitch = {
        description: abbreviations.description,
        abbreviation : abbreviations.abbreviation
      }
      setAbbreviations({
        ...abbreviations,
        list: [...abbreviations.list, newStitch],
        description: '',
        abbreviation: ''
      });
    }
  }
  const removeAbbreviation = (index) => {
    const updatedStitches = abbreviations.list.filter((item, i) => i !== index);
    setAbbreviations({
      ...abbreviations,
      list: updatedStitches
    });
  }

  const selectedStitchesCombination = stitches_icons.filter(option => selectedStitchesIds.includes(option.id));
  const handleStitchInputChange = (event) =>{
    const selectedIds = Array.from(event.target.selectedOptions, (option) => parseInt(option.value));
    setSelectedStitchesIds(selectedIds);
  }
  const removeStitchFromCombination = (index) => {
    const updatedList = selectedStitchesIds.filter((item, i) => i !== index);
    setSelectedStitchesIds(updatedList);
  }

  const quillRef = useRef();
  
  const patternObject = (pictureUrl) => {
    return {
      name: patternName,
      description: description,
      patternAuthor: patternAuthor,
      difficulty: difficulty,
      category: category,
      pattern: pattern,
      video: videoTutorial,
      picture : {
        author: patternAuthor,
        url: pictureUrl
      },
      materials: {
        hook: hookSize,
        yarnColors : yarnColors.colors,
        others : others
      },
      abbreviations: abbreviations.list,
      stitches: selectedStitchesCombination
    }
  };

  const asignTextToArray = (text, arraySetter) => {
    console.log("input text");
    if(!text) return;
    if(text.length <= 0){
      arraySetter([]);
    }
    const newArray = [];
    const words = text.split(',');
    words.forEach(word => {
      //const trimmedWord = word.trim();
      newArray.push(word);
    })
    arraySetter(newArray);
  }

  // On Edition
  useEffect(()=>{
    const fetchDoc = async ()=>{
      try{
        const patternItem = await getItemInCollection(id, 'patterns');
        if(patternItem){
          const stitchesCombinationIds = patternItem.stitches.map((stitch) => (stitch.id))
          setPatternId(id);
          setPatternName(patternItem.name);
          setDescription(patternItem.description);
          setDifficulty(patternItem.difficulty);
          setCategory(patternItem.category);
          setPattern(patternItem.pattern);
          setCurrentPictureUrl(patternItem.picture.url);
          setHookSize(patternItem.materials.hook);
          setYarnColors({
            ...yarnColors,
            colors: [...patternItem.materials.yarnColors],
            nameInput: '',
            codeInput: ''
          });
          setOthers(patternItem.materials.others);
          setPatternAuthor(patternItem.patternAuthor);
          setVideoTutorial(patternItem.video);
          setSelectedStitchesIds(stitchesCombinationIds);
          setAbbreviations({
            ...abbreviations,
            list: [...patternItem.abbreviations],
            description: '',
            abbreviation: ''
          })
        }
      }
      catch(err){
        console.error(err);
      }
    }
    if(id){
      fetchDoc();
    }
    addYarnColor("", "");
  },[])

  const createPattern = async () =>{
    console.log('Creating Pattern');

    // Upload Picture File
    let pictureUrl;
    if(patterPictureFile != null){
      await uploadImage(patterPictureFile, patternName, imagesPatternsFolderRef)
      .then((imageUrl) =>{
        pictureUrl = imageUrl
      } )
      .catch((value) => {
        console.error(value);
        console.error("Not able to upload picture");
        pictureUrl = "";
      })
    }

    // Upload Doc
    const pattern = patternObject(pictureUrl);
    try{
      await createObjectInDatabase(pattern, 'patterns');
    }
    catch(error){
      console.log(error);
    }
    console.log("Upload complete");
  }

  const EditPattern = async () =>{
    console.log("Editing Pattern");
    // Update Picture File
    let updatedUrl = currentPictureUrl;
    if(patterPictureFile != null){
      try {
        const picUrl = await uploadImage(patterPictureFile, patternName, imagesPatternsFolderRef);
        updatedUrl = picUrl;
        // Delete old file
        await deleteImage(storage, currentPictureUrl);

      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error
        return;
      }
    }
    // Update Pattern in Db.
    try{
      await updateObjectInDatabase(id, patternObject(updatedUrl), 'patterns');
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <div className='form-container section-container'>
      <h1 className='title'>{id ? 'Edit' : 'Add New'} Pattern</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label htmlFor='pattern-name'>Name</label>
        <input id='pattern-name' value={patternName} onChange={e=>setPatternName(e.target.value)}/>

        <div className='flex-container flex-small-gap'>
          <div>
            <h4>Picture</h4>
            <img className='fit-picture' src={currentPictureUrl != '' ? currentPictureUrl : imageNotFoundPath} />
          </div>
          {!previewNewPicture ? <div></div> :
            <div>
              <h4>New Picture</h4>
              <img src={previewNewPicture} className='fit-picture'/>
            </div> 
          }
        </div>
        <label htmlFor='pattern-picture'>{patternId == '' ? 'Choose a ' : 'Change '}Picture file</label>
        <input id='pattern-picture' type='file' onChange={(e)=>{
            setPatternPictureFile(e.target.files[0])
            setPreviewNewPicture(URL.createObjectURL(e.target.files[0]))
          }}
        />
        <label htmlFor='pattern-description'>Description</label>
        <textarea id='pattern-description' placeholder='This pattern is ...' rows='3' cols='50' value={description} onChange={e => setDescription(e.target.value)}></textarea>

        <label htmlFor='pattern-author'>Author</label>
        <input id='pattern-author' placeholder='Write the author name ...' value={patternAuthor} onChange={e => setPatternAuthor(e.target.value)}></input>

        <label htmlFor="category">Category</label>
        <select id='category' name='category' value={category} onChange={e => setCategory(e.target.value)}>
        <option value='' disabled>--Select Category--</option>
          <option value='Amigurumi'>Amigurumi</option>
          <option value='Clothes'>Clothes</option>
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        <select id='difficulty' name='difficulty' value={difficulty} onChange={e => setDifficulty(e.target.value)}>
        <option value="" disabled>--Select Type--</option>
          <option value='Easy'>Easy</option>
          <option value='Medium'>Medium</option>
          <option value='Hard'>Hard</option>
        </select>

        <label htmlFor='pattern-hook'>Hook size in mm</label>
        <input type='number' id='pattern-hook' value={hookSize} onChange={e => setHookSize(e.target.value)}/>

        <p className='label'>Colors</p>
        <div className='flex-container flex-small-gap'>
          <input name='codeInput' placeholder='Enter a color code' value={yarnColors.codeInput} onChange={handleYarnColorInputChange}/>
          <input name='nameInput' placeholder='Enter name of color' value={yarnColors.nameInput} onChange={handleYarnColorInputChange}/>
          <Button
              content={<IoAdd/>}
              styletype='outline' variant='secondary' use='icon'
              onClick={addYarnColor}/>
        </div>
        
        <div className='tags'>
        {
          yarnColors.colors.map((colorItem, index) => (
            <div className='tag flex-container flex-small-gap' key={index}>
              <p>{colorItem.name}</p>
              <p>{colorItem.code}</p>
              <Button
                content={<IoMdClose/>}
                styletype='outline' variant='destructive' size='small' use='icon'
                onClick={() => removeYarnColor(index)}/>
            </div>
          ))
        }
        </div>

        <label htmlFor='pattern-other'>Other Materials</label>
        <textarea id='pattern-other' rows='2' cols='50' value={others} onChange={e => asignTextToArray(e.target.value, setOthers)} ></textarea>

        <label htmlFor='stitch-combination' className='label'>Stitches In the pattern</label>
        <select value={selectedStitchesIds} id='stitch-combination' multiple onChange={handleStitchInputChange}>
          <option value='0' disabled>---Select stitches---</option>
          {
            stitches_icons.map((stitch)=>(
              <option key={stitch.id} value={stitch.id}>{stitch.name}</option>
            ))
          }
        </select>
        <div className='tags'>
          {
            selectedStitchesCombination.map((stitch, index) => (
              <div key={index} className='tag'>
                <span className='font-bold'>{stitch.abbreviation} </span>
                <span>{stitch.name}</span>
                <Button content={<IoMdClose/>}
                styletype='outline' variant='destructive' use='icon' size='small'
                onClick={() => removeStitchFromCombination(index)}/>
              </div>
            ))
          }
        </div>
        <p className='label'>Abbreviations</p>
        <div className='flex-container flex-small-gap'>
          <input placeholder='Enter abbreviation' name='abbreviation' value={abbreviations.abbreviation} onChange={handleAbbreviationInputChange}/>
          <input placeholder='Enter description' name='description' value={abbreviations.description} onChange={handleAbbreviationInputChange}/>
          <Button content={<IoAdd/>}
          styletype='outline' variant='secondary' use='icon' size='small'
          onClick={addAbbreviation} />
        </div>
        <div className='tags'>
          {
            abbreviations.list.map((item, index) =>(
              <div className='tag flex-container flex-small-gap' key={index}>
                <p className='font-bold'>{item.abbreviation}</p>
                <p>{item.description}</p>
                <Button type="button" content={<IoMdClose/>}
                  styletype='outline' variant='destructive' size='small' use='icon'
                  onClick={()=> removeAbbreviation(index)}/>
              </div>
            ))
          }
        </div>

        <label htmlFor='pattern-lines'>Pattern</label>
        <RichTextEditor content={pattern} setContent={setPattern}/>
        
        <label htmlFor='pattern-video'>Link to video</label>
        <input id='pattern-video' value={videoTutorial} onChange={e => setVideoTutorial(e.target.value)}></input>

        <div className='buttons-line'>
          <input 
          type='submit' 
          className={`${buttonStyles.btn} ${buttonStyles.medium} ${buttonStyles.secondary} ${buttonStyles.filled}`}
          value='Save Changes'/>

          <Button type="button"
            content='Back'
            styletype='outline' variant='secondary'
            onClick={() => navigate(CONTENTMANAGEMENT_PATTERNS)}/>
        </div>

      </form>
    </div>
  )
}

export default Upsert