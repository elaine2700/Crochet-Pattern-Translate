import {ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage'
import {v4} from 'uuid'

export const uploadImage = (stitchPictureFile, stitchName, imageFolderRef) => {
    console.log('Uploading Image');
    if (stitchPictureFile == null)
        return Promise.resolve(null);

    const imageName = `${stitchName + '_' + v4()}`;
    const imageRef = ref(imageFolderRef, imageName);

    const uploadTask = uploadBytesResumable(imageRef, stitchPictureFile)

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

export const getList = ()=>{
  
}