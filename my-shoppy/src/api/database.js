import { getDatabase, ref, child, get, set } from "firebase/database";
import {v4 as uuidv4} from 'uuid';

const dbRef = ref(getDatabase());
export function checkIsAdmin (user) {
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

export async function getProducts() {
  return get(child(dbRef, `products/`)).then((snapshot) => {
    if (snapshot.exists()) {
        return snapshot.val();
      } 
      return [];
    }).catch((error) => {
      console.error(error);
    });
}

export async function writeProductData(product, imageUrl) {
  const id = uuidv4();
  const db = getDatabase();
  return set(ref(db, 'products/'+id),{
    ...product, 
      imageUrl, 
      id: id,
      option: product.option.split(',')
    });
}

export async function addCart(product, userId) {
  const db = getDatabase();
  return set(ref(db, `carts/${userId}/${product.id}`),product);
}

export async function getCart(userId) {
  return get(child(dbRef, `carts/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
        const items = snapshot.val() || {};
        return Object.values(items);
      } 
      return [];
    }).catch((error) => {
      console.error(error);
    });
}