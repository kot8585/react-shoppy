import { getDatabase, ref, child, get, set, remove } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const db = getDatabase();
const dbRef = ref(db);

// TODO: 에러처리
export function checkIsAdmin(user) {
  return get(child(dbRef, 'admins/'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().includes(user.uid);
      } else {
        console.error('No data available');
        return undefined;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getProducts() {
  return get(child(dbRef, 'products/'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function writeProductData(product, imageUrl) {
  const id = uuidv4();
  return set(ref(db, `products/${id}`), {
    ...product,
    imageUrl,
    id,
    option: product.option.split(','),
  });
}

export async function addOrUpdateCart(product, userId) {
  return set(ref(db, `carts/${userId}/${product.id}`), product);
}

export async function getCart(userId) {
  return get(child(dbRef, `carts/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const items = snapshot.val() || {};
        return Object.values(items);
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function removeFromCart(userId, productId) {
  return remove(ref(db, `carts/${userId}/${productId}`));
}
