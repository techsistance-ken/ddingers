// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAscYxsg2SpYEBmyT7TZYOAnYha2KWVoAU",
  authDomain: "ddingers-np-6566.firebaseapp.com",
  projectId: "ddingers-np-6566",
  databaseURL: "",
  storageBucket: "ddingers-np-6566.appspot.com",
  messagingSenderId: "562498461323",
  appId: "1:562498461323:web:7b66d05932e7103cd4fe8e",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = agetAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export {
    auth,
    db
}