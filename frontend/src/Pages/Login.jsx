import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try{
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch(error){
        console.error(error);
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

      <button className='btn-secondary'>Log In With Google</button>

      <p>Forgot Password?</p>
      <Link to='/signup'>New User? </Link>
    </div>
  )
}

export default Login