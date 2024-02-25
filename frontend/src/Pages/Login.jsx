import React, {useState} from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    console.log('sign in')
    try{
       
      await signInWithEmailAndPassword(auth, email, password);
      
      navigate('/');
    }
    catch(error){
        console.error(error);
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/');
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Login</h1>

      <label htmlFor='email'>Email</label>
      <input id='email'
          placeholder='mail@example.com'
          onChange={e => setEmail(e.target.value)}/>

      <label htmlFor='password'>Password</label>
      <input id='password'
          placeholder='Password...'
          onChange={e => setPassword(e.target.value)}/>

      <button className='btn-secondary'
          onClick={signIn}>
            Register
      </button>

      <p>or</p>

      <button className='btn-secondary'
      onClick={signInWithGoogle}>
        Log In With Google
      </button>

      <p>Forgot Password?</p>
      <Link to='/signup'>New User? </Link>
    </div>
  )
}

export default Login