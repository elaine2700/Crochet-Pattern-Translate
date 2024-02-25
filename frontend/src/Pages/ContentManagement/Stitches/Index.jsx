import {useState, useEffect} from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import Button from '../../../Components/Buttons/Button';


const Index = () => {

  const [stitches, setStitches] = useState([]);

  const stitchesCollection = collection(db, "stitches");

  const navigate = useNavigate();
  const goToCreateStitch = () => {
    navigate('/content-management/stitches/create')
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
            console.log(data.docs[0]._document.data.value.mapValue.fields);
            console.log(filteredData);
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
    <div className='container'>
      <header>
        <h1>Stitches</h1>
        <Button
          content={<div><FaCirclePlus/> Create Stitch</div>}
          onClick={goToCreateStitch}/>
      </header>
        <main>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contribution</th>
                <th></th>
              </tr> 
            </thead>
            <tbody>
              {
                stitches.map((stitch) => (
                  <tr>
                    <td>
                      {stitch.name}
                    </td>
                    <td>
                      {stitch.contributedBy}
                    </td>
                    <td>
                      <div>
                        <button>
                          <FaEdit/>
                        </button>
                        <button>
                          <FaTrash/>
                        </button>
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