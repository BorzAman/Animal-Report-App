
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCmZCRXwrImRnEEtCVA4dJarfG4uZMJFQo",
  authDomain: "animal-alert-48671.firebaseapp.com",
  projectId: "animal-alert-48671",
  storageBucket: "animal-alert-48671.firebasestorage.app",
  messagingSenderId: "661822812878",
  appId: "1:661822812878:web:d9b18c75fd05f14014969f",
  measurementId: "G-RBN1MWLL83"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider();
 const db=getFirestore(app);
export default auth;
export {db,googleProvider};  
