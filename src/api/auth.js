import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./config";
import { checkIsAdmin } from "./database";


const provider = new GoogleAuthProvider(); 
const auth = getAuth(app);

export async function login() { 
  return signInWithPopup(auth, provider).catch(console.error);
}

//TODO: 내가 신기한거는 로그인이 일어나면 onAuthState가 일어나잖아. 그때는 콜백이 전해지지 않는데 어떻게 기억을 하고 있지?
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



