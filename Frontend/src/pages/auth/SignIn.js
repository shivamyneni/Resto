import React, {useState} from 'react';
import {  signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const googleprovider = new GoogleAuthProvider();
    const facebookprovider = new FacebookAuthProvider();
    const onLogin = (e) => {
        // window.location.href='/user-info'
        e.preventDefault();
        // signInWithEmailAndPassword(auth, email, password)
        axios.post("http://localhost:8082/signin",{
            email:email,
            password:password,
            logintype:"email"
            }).then(res => {
                console.log(res)
                if(res.data.error){
                    alert(res.data.error)
                }
                else{
                    navigate("/user-info")
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }
    const socialLogin = (email) =>{
        axios.post("http://localhost:8082/signin",{
            email:email,
            logintype:"social"
            }).then(res => {
                console.log(res)
                if(res.data.error){
                    alert(res.data.error)
                }
                else{
                    navigate("/user-info")
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
        });
    }
    const googleSignIn=()=>{
        signInWithPopup(auth, googleprovider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                socialLogin(user.email)
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
            socialLogin(user.email)
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
            <div className='flex flex-col items-center justify-center m-10'>         
                <h4><b>Login here</b></h4>                                                                                   
                <form className='bg-white shadow-md rounded-lg p-8'>                                              
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-bold mb-2' htmlFor="email-address">Email address</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                            id="email-address"
                            name="email"
                            type="email"                                    
                            required                                                                                
                            placeholder="Email address"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-bold mb-2' htmlFor="password">Password</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                            id="password"
                            name="password"
                            type="password"                                    
                            required                                                                                
                            placeholder="Password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className='mb-6'>
                        <button 
                        className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                        onClick={onLogin}>Login</button>
                    </div>
                    <p className="text-sm text-black text-center">
                        No account yet? <Link to="/signup">Sign up</Link>
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

export default SignIn;