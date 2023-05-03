// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC63fxfhkEcfU8Dfkpr9BuafcLB_mJuMKo",
  authDomain: "restogossip.firebaseapp.com",
  projectId: "restogossip",
  storageBucket: "restogossip.appspot.com",
  messagingSenderId: "807819550146",
  appId: "1:807819550146:web:0e5d444e19bbe60fcc0a5b",
  measurementId: "G-DYJTQDE11Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
provider.setCustomParameters({
  login_hint: "user@example.com",
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const analytics = getAnalytics(app);
export default app;
