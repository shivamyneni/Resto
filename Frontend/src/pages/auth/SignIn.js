import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {  signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword,FacebookAuthProvider } from "firebase/auth";
import Header from '../../components/Header';
import { auth } from '../../firebase';
import FacebookIcon from '@mui/icons-material/Facebook';
const SignIn = () => {
    const navigate = useNavigate();
    const googleprovider = new GoogleAuthProvider();
    const facebookprovider = new FacebookAuthProvider();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });  
    }
    const googleSignIn=()=>{
        signInWithPopup(auth, googleprovider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                navigate("/user-info")
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }
    const facebookSignIn=()=>{
        signInWithPopup(auth, facebookprovider)
        .then((result) => {
            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            navigate("/user-info")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }
    return(
        <div>
        <Header />
        <div className='min-h-screen flex flex-col items-center justify-center'>
        <form className='w-full max-w-sm mt-8 p-6 bg-white rounded-lg shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Sign In</h2>
      
          <div className='mb-4'>
            <label htmlFor='email-address' className='block text-gray-700 font-medium mb-2'>
              Email address
            </label>
            <input
              type='email'
              id='email-address'
              className='form-input w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-blue-400'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='Enter email'
            />
          </div>
      
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700 font-medium mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='form-input w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-blue-400'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Enter password'
            />
          </div>
      
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50'
            onClick={onLogin}
          >
            Log In
          </button>
      
          <p className='mt-4 text-sm text-gray-600'>
            Create an account?{' '}
            <Link to='/signup' className='text-blue-500 hover:text-blue-600'>
              Sign Up
            </Link>
          </p>
        </form>
      
        <div class="inline-flex items-center justify-center w-full">
            <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                <text>OR</text>
            </div>
        </div>
      
        <div className='flex flex-col items-center justify-around'>
          <button
            className='bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50'
            onClick={facebookSignIn}
          >
            <div className='flex justify-around'>
                <text>Continue with Facebook</text>
                <img src="https://img.icons8.com/material/24/ffffff/facebook-f.png"/>
            </div>
          </button>
      
          <button
            className='bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50 mt-4'
            onClick={googleSignIn}
          >
            <div className='flex'>
                <text>Continue with Google</text>
                <img src="https://img.icons8.com/material/24/ffffff/google-logo--v1.png"/>
            </div>
        </button>
      </div>
    </div>
    </div>
    )
}
 
export default SignIn