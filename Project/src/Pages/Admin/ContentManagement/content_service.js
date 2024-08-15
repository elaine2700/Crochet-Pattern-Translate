import { getDoc, doc, addDoc, collection, getDocs, updateDoc, deleteDoc, setDoc } from 'firebase/firestore/lite';
import {ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage'
import {v4} from 'uuid'
import {db, imagesFolderRef} from '../../../config/firebase'

export const uploadImage = (pictureFile, itemName, imagePath) => {
    console.log('Uploading Image');
    if (pictureFile == null)
        return Promise.resolve(null);

    console.log("pattern ref");
    const imageName = `${itemName + '_' + v4()}`;
    const imageRef = ref(imagesFolderRef, `${imagePath}/${imageName}`);
    
    const uploadTask = uploadBytesResumable(imageRef, pictureFile)

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

export const deleteImage = (dbStorage, pictureUrl) =>{
    if(!pictureUrl) 
        return Promise.resolve(null);
    console.log('deleting Image');
    
    return new Promise((resolve, reject)=>{
        const pictureRef = ref(dbStorage, pictureUrl);
        deleteObject(pictureRef).then(() => {
            // File deleted successfully
            resolve();
          }).catch((error) => {
            reject(error);
          });
    })
    
    
}

export const getCollectionList = async(collectionName)=>{
  const dataCollection = collection(db, collectionName);
  try{
    const data = await getDocs(dataCollection);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))
    return filteredData;
  }
  catch(error){
    console.error(error)
    return []
  }
}

export const getItemInCollection = async(itemId, collectionName) =>{
  if(!itemId)
    return null;
  if(!collectionName)
    return null;
  try{
    const docRef = doc(db, collectionName, itemId);
    const data = await getDoc(docRef);
    if(!data.exists()) {
      return null;
    }
    const stitchData = data.data();
    return stitchData;
  }
  catch(err){
    console.error(err);
    return null;
  }
}

export const deleteItemInCollection = async(itemId, collectionName) =>{
  console.log('Deleting item in collection');
  try{
    const docRef = doc(db, collectionName, itemId);
    await deleteDoc(docRef);
  }
  catch(err){
    console.error(err);
  }
}

export const createObjectInDatabase = async (object, collectionName)=>{
  console.log('Creating new object');
  const dataCollection = collection(db, collectionName);
  try{
    const docRef = await addDoc(dataCollection, object);
    return true;
  }
  catch(error){
    console.error(error);
    return false;
  }
}

export const setDocumentInDatabase = async (dataRef, data) =>{
  console.log("Setting document");
  try{
    await setDoc(dataRef, data);
  }
  catch(error){
    console.error(error);
  }
}

export const updateObjectInDatabase = async (objectId, object, collectionName) =>{
  console.log(`Editing ${objectId} in ${collectionName} collection`);
  try{
    const docRef = doc(db, collectionName, objectId);
    await updateDoc(docRef, object);
  }
  catch(err){
    console.err(err);
  }
}

export const getNewRef = (collectionName)=>{
  return doc(collection(db, collectionName))
}