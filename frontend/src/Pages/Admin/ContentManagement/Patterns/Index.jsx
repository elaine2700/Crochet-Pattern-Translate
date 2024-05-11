import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import Button from "../../../../Components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { CONTENTMANAGEMENT_PATTERNS } from "../../../../config/links_path";

const Index = () => {
    const navigate = useNavigate();
    const goToCreatePattern = () =>{
        navigate(`${CONTENTMANAGEMENT_PATTERNS}/create`)
    }

    const goToEditPattern =(patternId) => {
        navigate(`${CONTENTMANAGEMENT_PATTERNS}/edit/${patternId}`)
    }

    const getPatternList = () => {
        
    }

    return (
    <div className='form-container'>
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
                    <th>Contribution</th>
                    <th></th>
                </tr> 
            </thead>
            <tbody>
                <tr>
                    <td>Name of Pattern</td>
                    <td>Crochet Spacecraft</td>
                    <td>
                        <div className='flex-container justify-end'>
                            <Button content={<FaEdit/>} />
                            <Button content={<FaTrash/>}/>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
      </main>
    </div>
  )
}

export default Index