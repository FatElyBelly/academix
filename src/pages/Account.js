// Styles
import '../styles/Account.css'

import { useState } from 'react'

// Auth
import { signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';

// Buttons
import WhiteButton from '../components/Reusables/WhiteButton.js'
import GradientButton from '../components/Reusables/GradientButton.js';

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faUser, faEnvelope, faStar, faChalkboardUser, faClock } from "@fortawesome/free-solid-svg-icons"

// Firestore
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebase'

const Account = () => {
    const navigate = useNavigate();

    const [user] = useAuthState(auth)
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        uid: '',
        subscription: '',
        classes: [],
    })

    const getUserData = async(u) => {
        let docRef = doc(db, "users", u.uid)
        let docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setUserData(docSnap.data())
        } else {
            console.log("No document")
            return null
        }
    }

    const handleLogout = () => {               
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    let openAlertBox = (title, text, overlay, button, buttonFunction) => {
        document.getElementById("wrongCredentials").style.top = "2vh"
        document.getElementById("alertTitle").innerHTML = title
        if (text) {
            document.getElementById("alertText").style.display = "block"
            document.getElementById("alertText").innerHTML = text
        } else {
            document.getElementById("alertText").style.display = "none"
        }
        if (button) {
            document.getElementById("alertButton").style.display = "block"
            document.getElementById("alertButton").innerHTML = button
            document.getElementById("alertButton").onclick = buttonFunction
        } else {
            document.getElementById("alertButton").style.display = "none"
        }

        // Darken page
        if (overlay) {
            document.getElementById(overlay).style.filter = "brightness(80%)"
        }
    }

    let closeAlertBox = (overlay) => {
        document.getElementById("wrongCredentials").style.top = "-20vh"
        document.getElementById(overlay).style.filter = "brightness(100%)"
    }

    return <div>
        <div className="alertContainer" id="wrongCredentials">
            <div className="alertBox">
                <FontAwesomeIcon onClick={() => {closeAlertBox("page")}} className="alertClose" icon={faXmark}/>
                <h1 id="alertTitle" className="alertTitle">Error</h1>
                <p id="alertText" className="alertText"></p>
                <button id="alertButton" className="alertButton"></button>
            </div>
        </div>
        <div id="page" className="signoutPage">
            <div className="signoutMain">
                <div className="accountInfoDiv">
                    <div className="accountInfoPartDiv">
                        <h1 className="accountInfoTitle">Informations</h1>
                        <div className="accountInfoInnerDiv">
                            <h1 className="accountInfoText"><FontAwesomeIcon icon={faUser}/>&nbsp; {getUserData(user) ? userData.username : "Unnamed"}</h1>
                            <h1 className="accountInfoText"><FontAwesomeIcon icon={faEnvelope}/>&nbsp; {user.email}</h1>
                        </div>
                    </div>
                    <div className="accountInfoPartDiv">
                        <h1 className="accountInfoTitle">Abonnement</h1>
                        <div className="accountInfoInnerDiv">
                            <h1 className="accountInfoText"><FontAwesomeIcon icon={faStar}/>&nbsp; {(userData.subscription === "none") ? "Pas d'abonnements" :  `Membre ${userData.subscription.charAt(0).toUpperCase() + userData.subscription.slice(1)}`}</h1>
                            <h1 className="accountInfoText"><FontAwesomeIcon icon={faClock}/>&nbsp; Membre depuis le ...</h1>
                            <h1 className="accountInfoText"><FontAwesomeIcon icon={faChalkboardUser}/>&nbsp; {userData.classes.map((userClass) => {return `${userClass} `})}</h1>
                        </div>
                        <div className="accountInfoInnerDiv">
                            <WhiteButton text="Changer d'abonnement"/>
                        </div>
                    </div>
                </div>
                
                <div className="accountNavigationDiv">
                    <h1 className="signoutTitle">Vous êtes connecté.</h1>
                    <GradientButton text="Se deconnecter" function={() => {openAlertBox('Êtes-vous sûr de vouloir vous déconnecter?', undefined, 'page', 'Oui', handleLogout)}}/>
                    <GradientButton text="Page d'accueil" function={() => {navigate("/")}}/>
                </div>
            </div>
        </div>
    </div>
}

export default Account