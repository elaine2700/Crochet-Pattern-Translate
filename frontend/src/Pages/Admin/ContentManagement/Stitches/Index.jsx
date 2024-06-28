import {useState, useEffect} from 'react'
import { doc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { db, storage, storageStitchesFolderName } from '../../../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { deleteImage } from '../content_service';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import Button from '../../../../Components/Buttons/Button';
import { CONTENTMANAGEMENT_STITCHES } from '../../../../config/links_path';

const Index = () => {

  const [stitches, setStitches] = useState([]);

  const stitchesCollection = collection(db, storageStitchesFolderName);

  const navigate = useNavigate();
  const goToCreateStitch = () => {
    navigate('/admin/content-management/stitches/create')
  }
  const goToEditStitch = (id) =>{
    console.log(id);
    navigate(`${CONTENTMANAGEMENT_STITCHES}/edit/${id}`)
  }

  const deleteStitch = async(stitchId, stitchPictureUrl)=>{
    console.log('Deleting Stitch');
    try{
      const docRef = doc(db,'stitches', stitchId);
      await deleteDoc(docRef);
      const stitchesList = await getStitchesList();
      await deleteImage(storage, stitchPictureUrl);
      alert("Stitch Deleted successfully");
      setStitches(stitchesList);
    }
    catch(err){
      console.error(err);
    }
  }

  // TODO Hide stitch

  const getStitchesList = async () => {
    try{
        const data = await getDocs(stitchesCollection);
        const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
        return filteredData;
    }
    catch (error){
        console.error(error)
        // TODO redirect to Oops-Error Page
        return []
    }   
}  

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Call the asynchronous function and wait for the result
            const stitchesList = await getStitchesList();
            // Once the result is obtained, set the state
            setStitches(stitchesList);
        } catch (error) {
            console.error(error);
            // TODO redirect to Oops-Error Page
            setStitches([]); // You might want to set an empty array here if an error occurs
        }
    };

    // Call the async function
    fetchData();
  }, []);


  return (
    <div className='form-container'>
      <header className='flex-container justify-space-between'>
        <h1>Stitches</h1>
        <Button
          content={<div><FaCirclePlus/>New Stitch</div>}
          onClick={goToCreateStitch}/>
      </header>
        <main>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contribution</th>
                <th></th>
              </tr> 
            </thead>
            <tbody>
              {
                stitches.map((stitch, id) => (
                  <tr key={id}>
                    <td>
                      {stitch.name}
                    </td>
                    <td>
                      {stitch.contributedBy}
                    </td>
                    <td>
                      <div className='flex-container justify-end'>
                        <Button content={<FaEdit/>} onClick={()=>goToEditStitch(stitch.id)}/>
                        <Button variant='destructive' type='filled' content={<FaTrash/>} onClick={()=>deleteStitch(stitch.id, stitch.picture.url)}/>
                      </div>
                    </td>
                  </tr>
                  
                ))
              }
            </tbody>

          </table>
        </main>
      
    </div>
    
  )
}

export default Index