import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { app } from './config';
import { checkIsAdmin } from './database';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export async function login() {
  return signInWithPopup(auth, provider).catch(console.error);
}

export function getUserState(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      checkIsAdmin(user).then((isAdmin) => {
        callback({
          ...user,
          isAdmin,
        });
      });
    } else {
      callback(user);
    }
  });
}

export async function logout() {
  return signOut(auth).catch(console.error);
}
