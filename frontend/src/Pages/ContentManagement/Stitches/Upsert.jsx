import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import {ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage'
import { imagesStitchesFolderRef } from '../../../config/firebase'
import {v4} from 'uuid';

import { collection, addDoc, getDoc, doc, updateDoc} from 'firebase/firestore'
import { db, storageStitchesFolderName, storage } from '../../../config/firebase'

import buttonStyles from '../../../Components/Buttons/buttons.module.css'
import Button from '../../../Components/Buttons/Button'

const Upsert = () => {
  const imageNotFoundPath = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
  const {id} = useParams();
  const navigate = useNavigate()
  const stitchesCollection = collection(db, 'stitches');

  const [stitchId, setStitchId] = useState('');
  const [stitchName, setStitchName] = useState('')
  const [stitchDescription, setDescription] = useState('')
  const [stitchType, setStitchType] = useState('');
  const [stitchContributedBy, setContributedBy] = useState('');
  const [stitchDifficulty, setDifficulty] = useState('');
  const [stitchPicture, setStitchPicture] = useState(null);
  const [picAuthor, setPicAuthor] = useState('');
  const [combinationText, setCombinationText] = useState("");
  const [tutorialLink, setTutorialLink] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [previewPicture, setPreviewPicture] =useState(null);

  const separateCommas = (text) =>{
    return text.split(',');
  }

  const joinCommas = (stitchesList) =>{
    return stitchesList.join(',');
  }

  const uploadImage = () => {
    console.log('Uploading Image');
    if (stitchPicture == null) return Promise.resolve(null);

    const imageName = `${stitchName + v4()}`;
    const imageRef = ref(imagesStitchesFolderRef, imageName);

    const uploadTask = uploadBytesResumable(imageRef, stitchPicture)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
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
              reject(error)
              break;
            case 'storage/canceled':
              // User canceled the upload
              reject(error)
              break;
            // ...
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              reject(error)
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('Download URL:', downloadURL);
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  }

  const deleteImage = () => {
    if(!pictureUrl) return;
    console.log('deleting Image');
    const pictureRef = ref(storage, pictureUrl);
    
    deleteObject(pictureRef).then(() => {
      // File deleted successfully
      console.log('File deleted Succesfully')
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.error(error)
    });
  }

  const editStitch = async() =>{
    console.log('Editing the stitch');
    let updatedUrl = pictureUrl;
    if(stitchPicture != null){
      try {
        const picUrl = await uploadImage();
        updatedUrl = picUrl;
        // Delete old file
        deleteImage();

      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error
        return;
      }
    }

    const _combination = separateCommas(combinationText);
    console.log(updatedUrl);
    try{
      const docRef = doc(db,'stitches', id);
      await updateDoc(docRef,{
        combination: _combination,
        contributedBy: stitchContributedBy,
        description: stitchDescription,
        difficulty: stitchDifficulty,
        name: stitchName,
        picture: {
          author: picAuthor,
          url: updatedUrl
        },
        tutorial: tutorialLink,
        type: stitchType
      });
      console.log("Document updated with ID: ", docRef.id);
      navigate('/content-management/stitches')
      // TODO Create notification. Document updated successfully
    }
    catch(error){
      console.error(error);
      // TODO Navigate to Oops Page or Add Notification PopUp
    }
  }

  const createStitch = async()=>{
    console.log('Creating the stitch')
    let url = pictureUrl;
    try {
      const picUrl = await uploadImage();
      // TODO Delete the old picture.
      url = picUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error
      return;
    }
    //console.log(pictureUrl);

    const _combination = separateCommas(combinationText);

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
          url: url
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

  const handleSubmit = async (event, stitchData) => {
    event.preventDefault();

    console.log('Adding stitch or pattern..');

    if(id){
      editStitch();
    }
    else{
      createStitch();
    }

    

  }

  useEffect(()=>{
    const fetchDoc = async() =>{
      try{      
        const docRef = doc(db,'stitches', id);
        const data = await getDoc(docRef);
        const stitchData = data.data();
        setStitchId(id);
        setStitchName(stitchData.name);
        setDescription(stitchData.description);
        setStitchType(stitchData.type);
        setContributedBy(stitchData.contributedBy);
        setDifficulty(stitchData.difficulty);
        setPicAuthor(stitchData.picture.author);
        const combination = joinCommas(stitchData.combination);
        setCombinationText(combination);
        setTutorialLink(stitchData.tutorial);
        setPictureUrl(stitchData.picture.url);
      }
      catch(err){
        console.error(err);
      }
    }
    if(id){
      fetchDoc();
    }
    
  },[])

  return (

    <div className='form-container'>
      <h1 className='title'>{stitchId == '' ? 'Create' : 'Edit'} Stitch</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label htmlFor='stitch-name'>Stitch Name</label>
        <input id='stitch-name' name='stitch-name' value={stitchName} onChange={e => setStitchName(e.target.value)} type='text' required></input>
        
        <img src={pictureUrl != '' ? pictureUrl : imageNotFoundPath} />
        {previewPicture ? 
        <div>
          <h4>New Picture</h4>
          <img src={previewPicture}/>
        </div> : <div></div>}
        <label htmlFor='stitch-picture'>{stitchId == '' ? 'Choose a ' : 'Change '}Picture file</label>
        <input id='stitch-picture' type='file' onChange={(e)=>{
            setStitchPicture(e.target.files[0])
            console.log(URL.createObjectURL(e.target.files[0]))
            setPreviewPicture(URL.createObjectURL(e.target.files[0]))
          }}/>
        
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
            value={stitchId == '' ? 'Create' : 'Save Changes'}/>
          <Button
            content='Back'
            type='outline' variant='secondary'
            onClick={() => navigate('/content-management/stitches')}/>
        </div>
        
      </form>

    </div>
  )
}

export default Upsert