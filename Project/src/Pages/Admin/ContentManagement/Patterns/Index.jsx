import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import Button from "../../../../Components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { CONTENTMANAGEMENT_PATTERNS } from "../../../../config/links_path";
import { deleteImage, deleteItemInCollection, getCollectionList } from "../content_service";
import { useEffect, useState } from "react";
import { storage } from "../../../../config/firebase";
const Index = () => {
    const [patternList, setPatternList] = useState([]);
    const navigate = useNavigate();
    const goToCreatePattern = () =>{
        navigate(`${CONTENTMANAGEMENT_PATTERNS}/create`)
    }

    const goToEditPattern =(patternId) => {
        navigate(`${CONTENTMANAGEMENT_PATTERNS}/edit/${patternId}`)
    }

    const getPatternList = async() => {
        try{
            return await getCollectionList('patterns');
        }
        catch{
            return []
        }
    }

    const deletePattern = async(patternId, pictureUrl)=>{
        console.log("Deleting pattern");
        try{
            await deleteItemInCollection(patternId, 'patterns');
            if(pictureUrl){
                await deleteImage(storage, pictureUrl);
            }
            alert("pattern deleted succesfully");
            // get Stitches to reload data
            const patterns = await getPatternList();
            setPatternList(patterns);
        }
        catch(err){
            console.error(`Pattern was not deleted because: ${err}`);
        }
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            const list = await getPatternList();
            setPatternList(list);
        }
        fetchData();
    } , []);

    return (
    <div className='form-container section-container'>
        <header className='flex-container justify-space-between'>
        <h1>Patterns</h1>
        <Button
          content={<div><FaCirclePlus/> New Pattern</div>}
          onClick={goToCreatePattern}
          />
      </header>
      <main>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th></th>
                </tr> 
            </thead>
            <tbody>
                {
                    patternList.map((pattern, id) =>(
                    <tr key={id}>
                        <td>{pattern.name}</td>
                        <td>{pattern.author}</td>
                        <td>
                            <div className='flex-container justify-end'>
                                <Button content={<FaEdit/>} onClick={()=>goToEditPattern(pattern.id)}/>
                                <Button variant="destructive" content={<FaTrash/>} onClick={()=>deletePattern(pattern.id, pattern.picture.url ? pattern.picture.url : null)}/>
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