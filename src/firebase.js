// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCblPTyiRi7dJmhSk8OBBQIYsI1ZwibATU",
    authDomain: "academix-b2634.firebaseapp.com",
    projectId: "academix-b2634",
    storageBucket: "academix-b2634.appspot.com",
    messagingSenderId: "36587936607",
    appId: "1:36587936607:web:4079e2d5ddc856a087b4ea",
    measurementId: "G-P43GYS3WS5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app