import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKJntAGFA5s9Dbji7zbz1PPE48mWRqKbY",
  authDomain: "ecommerce-6900e.firebaseapp.com",
  projectId: "ecommerce-6900e",
  storageBucket: "ecommerce-6900e.appspot.com",
  messagingSenderId: "665060514536",
  appId: "1:665060514536:web:1f65c163395cf206d9875d",
  measurementId: "G-5HB3FZYF52"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export default app;
