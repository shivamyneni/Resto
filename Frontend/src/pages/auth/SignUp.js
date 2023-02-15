import React,{useState} from 'react'
import Header from '../../components/Header';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { useNavigate,Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export default function SignUp() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const googleSignIn=()=>{
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                navigate("/user-info")
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    const onSubmit = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("/user-info")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });


    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    return (
    <div className='h-screen'>
        <Header />
        <form className='flex flex-col items-center justify-center h-3/4'>                                                                                            
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
        <div>
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
        </div>                                              
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
        <div class="inline-flex items-center justify-center w-full">
            <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                <text>OR</text>
            </div>
        </div>
        </form> 
        <div className='h-auto flex flex-col items-center justify-around'>
            <div className='flex'>
                <button>Continue with FaceBook</button>
            </div>
            <br />
            <div className='flex'>
                <button onClick={googleSignIn}>Continue with Google</button>
            </div>
            <br />
            <div className='flex'>
                <button>Continue with Apple</button>
            </div>
        </div>
    </div>
    )
}