import React,{useState} from 'react'
import Header from '../../components/Header';
import { useNavigate,Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,FacebookAuthProvider } from "firebase/auth";
import axios from 'axios';
export default function SignUp() {
    const auth = getAuth();
    const googleprovider = new GoogleAuthProvider();
    const facebookprovider = new FacebookAuthProvider();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    // const googleSignIn=()=>{
    //     signInWithPopup(auth, googleprovider)
    //         .then((result) => {
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;
    //             const user = result.user;
    //             navigate("/user-info")
    //         }).catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             const email = error.customData.email;
    //             const credential = GoogleAuthProvider.credentialFromError(error);
    //         });
    // }
    // const facebookSignIn=()=>{
    //     signInWithPopup(auth, facebookprovider)
    //     .then((result) => {
    //         const user = result.user;
    //         const credential = FacebookAuthProvider.credentialFromResult(result);
    //         const accessToken = credential.accessToken;
    //         navigate("/user-info")
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         const email = error.customData.email;
    //         const credential = FacebookAuthProvider.credentialFromError(error);
    //     });
    // }
    const onSubmit = (e) => {
        window.location.href='/user-info'
        e.preventDefault()
        axios.post("http://localhost:8082/signup",{
            email:email,
            name:name,
            password:password
        }).then(result =>{
            console.log(result)
        })
    }
    return (
    <div className='h-screen'>
        <Header />
        <form className='flex flex-col items-center justify-center h-3/4'>                                                                                            
        <div>
            <label htmlFor="your-name">
                Name
            </label>
            <input
                type="text"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}  
                required                                    
                placeholder="Enter name"                                
            />
        </div>
        <div>
            <label htmlFor="email-address">
                Email address
            </label>
            <input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  
                required                                    
                placeholder="Enter email"                                
            />
        </div>
        <div>
            <label htmlFor="password">
                Password
            </label>
            <input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required                                 
                placeholder="Enter password"              
            />
        </div>
        {/* <div>
            <label htmlFor="password">
                Confirm Password
            </label>
            <input
                type="password"
                label="Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required                                 
                placeholder="Re-enter password"              
            />
        </div>                                               */}
        <button
            className='border-2'
            type="submit" 
            onClick={onSubmit}                        
        > 
            Sign Up                                
        </button>  
        <p className="text-sm text-black text-center">
            Already have an account? {' '}
            <Link to="/signin">
                Sign In
            </Link>
        </p>         
        </form> 
        {/* <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                <text>OR</text>
            </div>
        </div>
        <div className='h-auto flex flex-col items-center justify-around'>
            <div className='flex'>
                <button onClick={facebookSignIn}>Continue with FaceBook</button>
            </div>
            <br />
            <div className='flex'>
                <button onClick={googleSignIn}>Continue with Google</button>
            </div>
            <br />
        </div> */}
    </div>
    )
}