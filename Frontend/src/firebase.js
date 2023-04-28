// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkMjGX_ewDdyvyfpPex1xKAoqfKtUxuCw",
  authDomain: "movierating-33b01.firebaseapp.com",
  projectId: "movierating-33b01",
  storageBucket: "movierating-33b01.appspot.com",
  messagingSenderId: "344536282950",
  appId: "1:344536282950:web:dd4983c7d8500544189747",
  measurementId: "G-ES28NZQLDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const analytics = getAnalytics(app);
export default app;