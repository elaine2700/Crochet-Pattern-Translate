import {useState, useEffect} from 'react'
import { doc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { db, storage, storageStitchesFolderName } from '../../../config/firebase';
import { redirect, useNavigate } from 'react-router-dom';
import { deleteImage } from '../stitches_shared';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import Button from '../../../Components/Buttons/Button';


const Index = () => {

  const [stitches, setStitches] = useState([]);

  const stitchesCollection = collection(db, storageStitchesFolderName);

  const navigate = useNavigate();
  const goToCreateStitch = () => {
    navigate('/content-management/stitches/create')
  }
  const goToEditStitch = (id) =>{
    navigate(`/content-management/stitches/edit/${id}`)
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
        //setStitches(filteredData);
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
          content={<div><FaCirclePlus/> Create Stitch</div>}
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
                        <Button content={<FaTrash/>} onClick={()=>deleteStitch(stitch.id, stitch.picture.url)}/>
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