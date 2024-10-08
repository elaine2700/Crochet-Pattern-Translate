import {useState} from 'react'
import { signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { auth, googleProvider } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { HOME } from '../../config/links_path';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try{
      var result = await signInWithEmailAndPassword(auth, email, password)
      if(result){
        navigate(HOME)
      }
    }
    catch(err){
      console.error(err);
    }
    
  }

  const signInWithGoogle = async () => {
    try {
      var result = await signInWithPopup(auth, googleProvider)
      if(result){
          navigate('/');
      }
    }
    catch(err){
      console.error(err);
    }
  }


  return (
    <div className='section-container'>
      <div className='form-container'>
        <h1 className='title'>Admin Login</h1>

        <label htmlFor='email'>Email</label>
        <input id='email'
            placeholder='mail@example.com'
            onChange={e => setEmail(e.target.value)}/>

        <label htmlFor='password'>Password</label>
        <input id='password'
            placeholder='Password...'
            onChange={e => setPassword(e.target.value)}/>

        <div className='flex-container flex-column align-items-center margin-top-medium flex-small-gap'>
          <div>
            <button className='btn-secondary'
                onClick={signIn}>
                  Log In
            </button>
          </div>
          <div>or</div>
          <div>
            <button className='btn-secondary'
              onClick={signInWithGoogle}>
              Log In with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login