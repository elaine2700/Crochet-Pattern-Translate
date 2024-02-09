import React, {useState, useEffect} from 'react'
import { auth, googleProvider } from '../config/firebase';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        }
        catch (error){
            console.error(error);
        }
    }

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        }
        catch (err){
            console.error(err);
        }
    }

    const logOut = async() =>{
        try{
            await signOut(auth);
        }
        catch (err){
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
            onClick={signIn}>Register</button>

        <button className='btn-secondary'
            onClick={logOut}>Log Out</button>

        <button className='btn-primary'
            onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

export default SignUp