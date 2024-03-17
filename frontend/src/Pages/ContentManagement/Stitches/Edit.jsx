import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db, imagesStitchesFolderRef } from '../../../config/firebase';
import {v4} from 'uuid';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import buttonStyles from '../../../Components/Buttons/buttons.module.css'
import Button from '../../../Components/Buttons/Button'

const Edit = () => {

  const navigate = useNavigate()
  const stitchesCollection = collection(db, 'stitches');

  const [stitchName, setStitchName] = useState('')
  const [stitchDescription, setDescription] = useState('')
  const [stitchType, setStitchType] = useState('');
  const [stitchContributedBy, setContributedBy] = useState('');
  const [stitchDifficulty, setDifficulty] = useState('');
  const [stitchPicture, setStitchPicture] = useState(null);
  const [picAuthor, setPicAuthor] = useState('');
  const [combinationText, setCombinationText] = useState("");
  const [tutorialLink, setTutorialLink] = useState('');

  const separateCommas = (text) =>{
    return text.split(',');
  }

  const checkImage = () => {
    // TODO If picture is the same, return. 
    console.log('Uploading Image');
    if(stitchPicture == null) return;

    const metadata = {
      contentType: 'image/jpeg'
    };

    const imageName = `${stitchName + v4()}`;
    const imageRef = ref(imagesStitchesFolderRef, imageName);

    const uploadTask = uploadBytesResumable(imageRef, stitchPicture)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        // ...
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('Download url')
        console.log(downloadURL);
        return downloadURL;
      });
    }
    );

  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    console.log('Adding stitch or pattern..');

    const pictureUrl = checkImage();
    console.log(pictureUrl);
    if(!pictureUrl){
      //TODO validate picture Url
    }

    const _combination = separateCommas(combinationText);

    const data = {
      combination: _combination,
        contributedBy: stitchContributedBy,
        description: stitchDescription,
        difficulty: stitchDifficulty,
        meta: {
          favs: 0,
          votes:0
        },
        name: stitchName,
        picture: {
          author: picAuthor,
          url: pictureUrl
        },
        tutorial: tutorialLink,
        type: stitchType
    }

    console.log(data);

    // TODO Validation of Data on Client and Server

    try{
      const docRef = await addDoc((stitchesCollection),{
        combination: _combination,
        contributedBy: stitchContributedBy,
        description: stitchDescription,
        difficulty: stitchDifficulty,
        meta: {
          favs: 0,
          votes:0
        },
        name: stitchName,
        picture: {
          author: picAuthor,
          url: ""
        },
        tutorial: tutorialLink,
        type: stitchType
      });
      console.log("Document written with ID: ", docRef.id);
      navigate('/content-management/stitches')
    }
    catch(error){
      console.error(error);
      // TODO Navigate to Oops Page or Add Notification PopUp
    }

  }

  return (
    <div className='container'>
      <h1 className='title'>Edit Stitch</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label htmlFor='stitch-name'>Stitch Name</label>
        <input id='stitch-name' name='stitch-name' value={stitchName} onChange={e => setStitchName(e.target.value)} type='text' required></input>

        <label htmlFor='stitch-description'>Description</label>
        <textarea id='stitch-description' name='stitch-description' value={stitchDescription} rows='3' cols='50'
        placeholder='This stitch is ...'
        onChange={e => setDescription(e.target.value)}></textarea>

        <label htmlFor='stitch-type' >Stitch Type</label>
        <select id='stitch-type' value={stitchType} onChange={e => setStitchType(e.target.value)} required>
          <option value="" disabled>--Select Type--</option>
          <option value="basic">Basic</option>
          <option value="combination">Combination</option>   
        </select>

        <label htmlFor='stitch-difficulty'>Difficulty</label>
        <select id='stitch-difficulty' value={stitchDifficulty} onChange={e=> setDifficulty(e.target.value)} required>
          <option value="" disabled>--Select Difficulty--</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="expert">Expert</option>
        </select>

        <label htmlFor='stitch-picture'>Picture</label>
        <input id='stitch-picture' type='file' onChange={(e)=>setStitchPicture(e.target.files[0])}/>
        
        <label htmlFor='stitch-picauthor'>Picture Author</label>
        <input id='stitch-picauthor' value={picAuthor} type='text' onChange={e => setPicAuthor(e.target.value)} required/>

        <label htmlFor='stitch-contribution'>Contribution by</label>
        <input id='stitch-contribution' value={stitchContributedBy} type='text' onChange={e => setContributedBy(e.target.value)} required/>

        {/*Separate values with comma*/}
        <label htmlFor='stitch-combination'>Stitches Combination. Separate values with comma</label>
        <input id='stitch-combination' value={combinationText} type='text' onChange={e=> setCombinationText(e.target.value)} required />

        <label htmlFor='stitch-tutorial'>Video Tutorial Link</label>
        <input id='stitch-tutorial' value={tutorialLink} type='text' onChange={e => setTutorialLink(e.target.value)}/>

        <div className='buttons-line'>
          <input className={`${buttonStyles.btn} ${buttonStyles.btnFilled} ${buttonStyles.btnSecondary}`}
            type='submit'
            value='Submit'/>
          <Button
            content='Back'
            type='outline' variant='secondary'
            onClick={() => navigate('/content-management/stitches')}/>
        </div>
        
      </form>

    </div>
  )
}

export default Edit