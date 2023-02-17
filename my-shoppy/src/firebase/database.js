import { getDatabase, ref, child, get, set } from "firebase/database";
import { app } from "./config";

const database = getDatabase(app);

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

export function writeProductData(product) {
  const db = getDatabase();
  set(ref(db, 'products/'+product.id), product);
}