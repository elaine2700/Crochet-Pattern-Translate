import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {

  const navigate = useNavigate()

  const logOut = async() =>{
    try{
        await signOut(auth);

        //todo a hard refresh
        navigate('/');
    }
    catch (err){
        console.error(err);
    }
}

  return (
    <div>
      <button className='btn-secondary'
        onClick={logOut}>Log Out
      </button>

    </div>
  )
}

export default SignOut