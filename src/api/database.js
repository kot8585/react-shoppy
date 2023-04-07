import {
  getDatabase,
  ref,
  child,
  get,
  set,
  remove,
  query,
  orderByChild,
  limitToLast,
  endBefore,
} from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const db = getDatabase();
const dbRef = ref(db);

// TODO: 에러처리
export function checkIsAdmin(user) {
  return get(child(dbRef, "admins/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().includes(user.uid);
      } else {
        console.error("No data available");
        return undefined;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getProducts(pageParam = "", limit=4) {
  console.log("database: ", pageParam);
  const result = [];
  await get(
    query(
      ref(db, "products"),
      orderByChild("createdAt"),
      endBefore(pageParam ?? ""),
      limitToLast(limit)
    )
  ).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((child) => {
        result.unshift(child.val());
      });
    } else {
      return [];
    }
  });
  if (result.length === limit) {
    return { data: result, nextCursor: result[limit - 1].createdAt };
  } else {
    return { data: result };
  }
}

export async function writeProductData(product, imageUrl) {
  const id = uuidv4();
  return set(ref(db, `products/${id}`), {
    ...product,
    imageUrl,
    id,
    option: product.option.split(","),
    createdAt: Date.now(),
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
