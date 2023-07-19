// Components
import HomePageActivitySection from '../components/HomePageActivitySection.js'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faCirclePlay, faBook, faChalkboardUser } from "@fortawesome/free-solid-svg-icons"

// Styles
import '../styles/Home.css'
import '../styles/Components/AlertBox.css'

// Auth
import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// State
import { useState } from 'react'

// Firestore
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebase'

const Home = () => {

    // User data
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

    return <div className="homePage">
        <div id="page">
            
            <div className="homePageContent" id="homePageMainContent">
                <div className="homeSection homePageSection">
                    <div className="homePageSectionTop">
                        <div className="homePageSectionTopLeft">
                            <h1 className="homePageSectionTopTitle">Bienvenue, {getUserData(user) ? userData.username : "Unnamed"}!</h1>
                            <h2 className="homePageSectionTopSubTitle">Que voulez-vous faire aujourd'hui?</h2>
                        </div>
                        <div className="homePageSectionTopRight">
                            <button onClick={()=>{window.open('/authentication', "_self")}} className="defaultButton"><FontAwesomeIcon icon={faUser}/>&nbsp; Mon compte</button>
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
                        unlocked={(userData.subscription==="premium") ? true : false}
                        subType="Premium"
                        title="Tutorat"
                        icon={faChalkboardUser}
                        difBackground={"blueGreenBackground"}
                        />
                        
                        <HomePageActivitySection
                        unlocked={(userData.subscription==="plus"||userData.subscription==="premium") ? true : false}
                        subType="Plus"
                        title="Exercices"
                        icon={faBook}
                        />
                    </div>

                    <div></div>
                </div>
            </div>
        </div>
    </div>
        
}

export default Home