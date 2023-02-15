// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); 

export async function login() { 
  //return이 없었는데 어떻게 실행이 된거지? 아... useEffect에서 실행됐나보다
  return signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("token", token);
        
        return result.user;        
      }).catch((error) => {
        throw new Error(`login error : ${error}`)
      });
  }

  export function getUserState(callback) {
    onAuthStateChanged(auth, callback);
}

export async function logout() {
  return signOut(auth).then(() => {
      return null;
    }).catch((error) => {
      throw new Error(`logout error: ${error}`)
    });
  }
export {auth};