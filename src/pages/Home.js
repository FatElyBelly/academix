// Components
import HomePageActivitySection from '../components/HomePageActivitySection.js'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faUser, faCirclePlay, faBook, faChalkboardUser } from "@fortawesome/free-solid-svg-icons"

// Styles
import '../styles/Home.css'
import '../styles/Components/AlertBox.css'

// Auth
import {auth} from '../firebase'
import { signOut } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'

// State
import { useState } from 'react'

// Firestore
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebase'

import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    // User data
    const [user] = useAuthState(auth)
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        uid: '',
        subscription: '',
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
            navigate("/")
        }).catch((error) => {
            // An error happened.
            console.log(error)
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

    return <div className="homePage">
        <div className="alertContainer" id="wrongCredentials">
            <div className="alertBox">
                <FontAwesomeIcon onClick={() => {closeAlertBox("page")}} className="alertClose" icon={faXmark}/>
                <h1 id="alertTitle" className="alertTitle">Error</h1>
                <p id="alertText" className="alertText"></p>
                <button id="alertButton" className="alertButton"></button>
            </div>
        </div>

        <div id="page">
            
            <div className="homePageContent" id="homePageMainContent">
                <div className="homeSection homePageSection">
                    <div className="homePageSectionTop">
                        <div className="homePageSectionTopLeft">
                            <h1 className="homePageSectionTopTitle">Bienvenue, {getUserData(user) ? userData.username : "False"}!</h1>
                            <h2 className="homePageSectionTopSubTitle">Que voulez-vous faire aujourd'hui?</h2>
                        </div>
                        <div className="homePageSectionTopRight">
                            <button onClick={()=>{openAlertBox("Êtes-vous sûr de vouloir vous déconnecter?", undefined, "page", "Oui", handleLogout)}} className="defaultButton"><FontAwesomeIcon icon={faUser}/>&nbsp; Mon compte</button>
                        </div>
                    </div>

                    <div className="homePageSectionContent">
                        <HomePageActivitySection
                        unlocked={(userData.subscription==="basic"||userData.subscription==="plus"||userData.subscription==="premium") ? true : false}
                        subType="Basic"
                        title="Videos"
                        icon={faCirclePlay}
                        openPage="videos"
                        />
                        
                        <HomePageActivitySection
                        unlocked={(userData.subscription==="plus"||userData.subscription==="premium") ? true : false}
                        subType="Plus"
                        title="Exercices"
                        icon={faBook}
                        />
                        
                        <HomePageActivitySection
                        unlocked={(userData.subscription==="premium") ? true : false}
                        subType="Premium"
                        title="Tutorat"
                        icon={faChalkboardUser}
                        />
                    </div>

                    <div></div>
                </div>
            </div>
        </div>
    </div>
        
}

export default Home