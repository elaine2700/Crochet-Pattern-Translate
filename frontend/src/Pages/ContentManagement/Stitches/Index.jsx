import {useState, useEffect} from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db, storageStitchesFolderName } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';

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

  useEffect(()=>{
    // Read the data.
    const getStitchesList = async () => {
        try{
            const data = await getDocs(stitchesCollection);
            const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
            setStitches(filteredData);
        }
        catch (error){
            console.error(error)
            // TODO redirect to Oops-Error Page
        }   
    }   
    // Set the Stitch List.
    getStitchesList();
}, []) 
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
                        <Button content={<FaTrash/>}/>
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