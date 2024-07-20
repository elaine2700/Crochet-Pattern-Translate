import {useState, useEffect} from 'react'
import { storage } from '../../../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { deleteImage, deleteItemInCollection, getCollectionList } from '../content_service';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import Button from '../../../../Components/Buttons/Button';
import { CONTENTMANAGEMENT_STITCHES } from '../../../../config/links_path';

const Index = () => {

  const [stitches, setStitches] = useState([]);

  const navigate = useNavigate();
  const goToCreateStitch = () => {
    navigate('/admin/content-management/stitches/create')
  }
  const goToEditStitch = (id) =>{
    console.log(id);
    navigate(`${CONTENTMANAGEMENT_STITCHES}/edit/${id}`)
  }

  const deleteStitch = async(stitchId, stitchPictureUrl) => {
    try{
      await deleteItemInCollection(stitchId, 'stitches');
      if(stitchPictureUrl){
        await deleteImage(storage, stitchPictureUrl);
      }
      alert('stitch deleted Successfully');
      // Reload data
      const stitches = await getStitchesList();
      setStitches(stitches);
    }
    catch(err){
      console.log(`Stitch was not deleted because: ${err}`);
    }
  }

  const getStitchesList = async () => {
    try{
      return await getCollectionList('stitches');
    }
    catch{
        return []
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const list = await getStitchesList();
      setStitches(list);
    }
    fetchData();
  }, []);

  return (
    <div className='form-container section-container'>
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
                        <Button variant='destructive' styletype='filled' content={<FaTrash/>} onClick={()=>deleteStitch(stitch.id, stitch.picture.url ? stitch.picture.url : null)}/>
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