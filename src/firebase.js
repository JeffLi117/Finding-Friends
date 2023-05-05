import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPtydZhVsEMxLMahaRa_wQ2CUK2ORQTmQ",
  authDomain: "finding-friends-e62a9.firebaseapp.com",
  projectId: "finding-friends-e62a9",
  storageBucket: "finding-friends-e62a9.appspot.com",
  messagingSenderId: "339264493061",
  appId: "1:339264493061:web:630acd9cea9c693c04ae6c"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}