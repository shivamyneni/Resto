import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onLogin = (e) => {
        window.location.href='/user-info'
        e.preventDefault();
        // signInWithEmailAndPassword(auth, email, password)
        axios.post("http://localhost:8082/signin",{
            email:email,
            password:password
            }).then(result =>{
                console.log(result.data)
            })
    }
    return(
        <div className='h-screen'> 
            <Header />     
            <div className='flex flex-col items-center justify-center h-screen'>                                                                                           
                <form className='bg-white shadow-md rounded-lg p-8'>                                              
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-bold mb-2' htmlFor="email-address">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"                                    
                            required                                                                                
                            placeholder="Email address"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-bold mb-2' htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"                                    
                            required                                                                                
                            placeholder="Password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>                
                    <div>
                        <button
                        className='border-2'
                        onClick={onLogin}>      
                            Login                                                                  
                        </button>
                    </div>         
                    <p className="text-sm text-black text-center">
                    No account yet? {' '}
                    <Link to="/signup">
                        Sign up
                    </Link>
                    </p>                       
                </form>  
            </div>                    
        </div>
    )
}
 
export default SignIn