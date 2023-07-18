import '../styles/Videos.css'

// State
import { useState, useEffect } from 'react'

// Auth
import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// Firestore
import { doc, getDoc, getDocs, collection, query } from "firebase/firestore"
import { db } from '../firebase'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faBook, faHouse, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

const Videos = () => {
    // User data
    const [user] = useAuthState(auth)

    useEffect(() => {
        // getChapterList(userClasses[selectedClass])
        getUserClasses(user)
    })

    useEffect(() => {
        changeSelectedClassButton()
        console.log('render1')
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

    const [chapters, setChapters] = useState([])

    const getChapterList = async(classname) => {
        let chapterCollection = collection(db, `classes/${classname}/chapitres`)
        let chapterQuery = query(chapterCollection)
        const chapterQuerySnapshot = await getDocs(chapterQuery)
        chapterQuerySnapshot.forEach((doc) => {
            if (!(chapters.some(chapter => chapter.title === doc.data().title))) {
                let docData = doc.data()
                docData["showed"] = false
                docData["icon"] = faChevronDown
                setChapters(current => [...current, docData])
                console.log(docData)
            }
        })
    }

    const toggleChapter = (chapterIndex) => {
        let chapterData = chapters
        if (chapters[chapterIndex].showed) {      
            document.getElementById("videosPageContentChapterMain"+chapterIndex).style.display = "none"
            document.getElementById("videosPageContentChapterTop"+chapterIndex).style.borderBottomLeftRadius = "25px"
            document.getElementById("videosPageContentChapterTop"+chapterIndex).style.borderBottomRightRadius = "25px"
            chapterData[chapterIndex]["showed"] = false
            chapterData[chapterIndex]["icon"] = faChevronDown
        } else {
            document.getElementById("videosPageContentChapterMain"+chapterIndex).style.display = "flex"
            document.getElementById("videosPageContentChapterTop"+chapterIndex).style.borderBottomLeftRadius = "0"
            document.getElementById("videosPageContentChapterTop"+chapterIndex).style.borderBottomRightRadius = "0"
            chapterData[chapterIndex]["showed"] = true
            chapterData[chapterIndex]["icon"] = faChevronUp
        }
        setChapters(chapterData)
    }

    return <div className="videosPage">
        <div className="videosPageSidenav">
            <div className="videosPageSidenavSection">
                <h1 className="sideNavSectionTitle">Mes classes</h1>
                <div className="sideNavSectionButtons sideNavClassButtons">
                    {userClasses.map((userClass, index) => {
                        return <button key={index} id={"sideNavClassButton"+index} onClick={() => {
                            setSelectedClass(index)
                            setChapters([])
                            getChapterList(userClasses[index])
                        }} className="sideNavSectionButton">{userClass}</button>
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
            {chapters.map((chapter, index) => {
                        return <div id={"videosPageContentChapter"+index} className="videosPageContentChapter">
                            <div onClick={() => {toggleChapter(index)}} id={"videosPageContentChapterTop"+index} className="videosPageContentChapterTop">
                                <h1 className="videosPageContentChapterTitle">{chapter.title}</h1>
                                <FontAwesomeIcon className="videosPageContentChapterIcon" icon={chapter.icon}/>
                            </div>
                            <div id={"videosPageContentChapterMain"+index} className="videosPageContentChapterMain">
                                {chapter.videos.map((video, vidIndex) => {
                                    return <span>Pour l'instant rien mais apres faut mettre video avec {video}</span>
                                })}
                            </div>
                        </div>
                    })}
        </div>
    </div>
}

export default Videos