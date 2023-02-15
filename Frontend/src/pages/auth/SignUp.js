import React,{useState} from 'react'
import Header from '../../components/Header';
import { useNavigate,Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, FacebookAuthProvider } from "firebase/auth";

export default function SignUp() {
    const auth = getAuth();
    const googleprovider = new GoogleAuthProvider();
    const facebookprovider = new FacebookAuthProvider();
    const navigate = useNavigate();
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
        });


    }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    return (
    <div className='h-screen'>
        <Header />
        <form className='flex flex-col items-center justify-center h-3/4'>
        <div>
            <label htmlFor="text">
                Name
            </label>
            <input
                type="text"
                label="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter name"
                className='p-1 m-1'
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
                className='p-1 m-1'
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
                className='p-1 m-1'         
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
                className='p-1 m-1'  
            />
        </div>                                              
        <button
            className='border-2 m-1'
            type="submit" 
            onClick={onSubmit}                        
        >Sign Up                                
        </button>  
        <p className="text-sm text-black text-center m-2">
            Already have an account? {' '}
            <Link to="/signin">
                Sign In
            </Link>
        </p>         
        </form> 
        <div class="inline-flex items-center justify-center w-full">
            <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
            <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
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
        </div>
    </div>
    )
}