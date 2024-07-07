import React, {useState, useEffect} from 'react'
import { auth, googleProvider } from '../config/firebase';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            navigate('/')
            //todo Notify user
            console.log('Registered User')
        }
        catch (error){
            console.error(error);
        }
    }

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        }
        catch (err){
            console.error(err);
        }
    }

    

    return (
        <div className='container section-container'>
            <h1 className='title'>Register</h1>

            <label htmlFor='username'>Username</label>
            <input id='username' required
                placeholder='User name'
                onChange={e => setUsername(e.target.value)}/>

            <label htmlFor='email'>Email</label>
            <input id='email' required
                placeholder='mail@example.com'
                onChange={e => setEmail(e.target.value)}/>

            <label htmlFor='password'>Password</label>
            <input id='password' required
                placeholder='Password...'
                onChange={e => setPassword(e.target.value)}/>

            <button className='btn-secondary'
                onClick={registerUser}>Register</button>
            <hr/>
            <p>or</p>
            <hr/>
            
            <button className='btn-primary'
                onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    )
}

export default SignUp