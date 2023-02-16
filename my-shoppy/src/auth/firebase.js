// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(); 
const auth = getAuth(app);
const database = getDatabase(app);

export async function login() { 
  return signInWithPopup(auth, provider).catch(console.error);
}

export function getUserState(callback) {
  onAuthStateChanged(auth, (user) => {
    if(user) {
      checkIsAdmin(user).then((isAdmin) => {
        callback({
          ...user,
          isAdmin,
        })
      })
    } else {
      callback(user);
    };
  });
}

export async function logout() {
  return signOut(auth).catch(console.error);
}


//얘 어디서 호출하지?
const dbRef = ref(getDatabase());
function checkIsAdmin (user) {
  return get(child(dbRef, `admins/`)).then((snapshot) => {
    if (snapshot.exists()) {
        return snapshot.val().includes(user.uid);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}
