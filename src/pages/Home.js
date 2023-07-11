// Components
import NavigationBar from '../components/NavigationBar.js'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

// Styles
import '../styles/Home.css'
import '../styles/Components/AlertBox.css'

// Auth
import {auth} from '../firebase'
import { signOut } from "firebase/auth"

import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {               
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out successfully")
            navigate("/")
        }).catch((error) => {
        // An error happened.
        });
    }

    let openAlertBox = (title, text, button, buttonFunction) => {
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
    }

    let closeAlertBox = () => {
        document.getElementById("wrongCredentials").style.top = "-20vh"
    }

    return <div className="homePage">
        <NavigationBar
            signout={() => {openAlertBox('Are you sure you want to logout?', undefined, 'Oui', handleLogout)}}
        />
        <div className="alertContainer" id="wrongCredentials">
            <div className="alertBox">
                <FontAwesomeIcon onClick={closeAlertBox} className="alertClose" icon={faXmark}/>
                <h1 id="alertTitle" className="alertTitle">Error</h1>
                <p id="alertText" className="alertText"></p>
                <button id="alertButton" className="alertButton"></button>
            </div>
        </div>
        
        <div className="homePageMainContent">
            <div className="homePageLeftContent">Left</div>
            <div className="homePageRightContent">
                <div className="upperSection">
                    <div className="sectionNav">
                        <h1 className ="sectionTitle">Prochaine session</h1>
                        <button className ="sectionButton">Voir</button>
                    </div>
                </div>
                <div className="lowerSection">
                    <div className="sectionNav">
                        <h1 className ="sectionTitle">Mon abonnement</h1>
                        <button className ="sectionButton">Voir</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Home