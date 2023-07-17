import '../styles/Videos.css'

// State
import { useState, useEffect } from 'react'

// Auth
import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// Firestore
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebase'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faBook, faHouse, faChevronDown } from "@fortawesome/free-solid-svg-icons"

const Videos = () => {
    // User data
    const [user] = useAuthState(auth)

    useEffect(() => {
        getUserClasses(user)
        changeSelectedClassButton()
    })

    const [userClasses, setUserClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState(0)

    const changeSelectedClassButton = () => {
        for (let i = 0; i < userClasses.length; i++) {
            if (i===selectedClass) {
                document.getElementById("sideNavClassButton"+i).style.background = "#fff"
                document.getElementById("sideNavClassButton"+i).style.color = "#5541e9"
            } else {
                document.getElementById("sideNavClassButton"+i).style.background = "none"
                document.getElementById("sideNavClassButton"+i).style.color = "#fff"
            }
        }
    }

    const getUserClasses = async(u) => {
        let docRef = doc(db, "users", u.uid)
        let docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setUserClasses(docSnap.data().classes)
        } else {
            console.log("No document")
            return null
        }
    }

    return <div className="videosPage">
        <div className="videosPageSidenav">
            <div className="videosPageSidenavSection">
                <h1 className="sideNavSectionTitle">Mes classes</h1>
                <div className="sideNavSectionButtons sideNavClassButtons">
                    {userClasses.map((userClass, index) => {
                        return <button key={index} id={"sideNavClassButton"+index} onClick={() => {setSelectedClass(index)}} className="sideNavSectionButton">{userClass}</button>
                    })}
                </div>
            </div>

            <div className="videosPageSidenavSection">
                <h1 className="sideNavSectionTitle">S'entrainer</h1>
                <div className="sideNavSectionButtons">
                    <button className="sideNavSectionButton"><FontAwesomeIcon icon={faBook}/>&nbsp; Exercices</button>
                </div>
            </div>

            <div className="videosPageSidenavSection">
                <h1 className="sideNavSectionTitle">Navigation</h1>
                <div className="sideNavSectionButtons">
                    <button className="sideNavSectionButton"><FontAwesomeIcon icon={faUser}/>&nbsp; Mon compte</button>
                    <button onClick={()=>{window.open("/", "_self")}} className="sideNavSectionButton"><FontAwesomeIcon icon={faHouse}/>&nbsp; Retourner</button>
                </div>
            </div>
        </div>

        <div className="videosPageContent">
            <div id="videosPageContentChapter0" className="videosPageContentChapter">
                <div className="videosPageContentChapterTop">
                    <h1 className="videosPageContentChapterTitle">Chapitre 1 - dasjiodjasiojdioa</h1>
                    <FontAwesomeIcon className="videosPageContentChapterIcon" icon={faChevronDown}/>
                </div>
            </div>
        </div>
    </div>
}

export default Videos