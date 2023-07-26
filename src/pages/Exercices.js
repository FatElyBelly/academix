import '../styles/Exercices.css'

// State
import { useState, useEffect } from 'react'

// Buttons
import WhiteButton from '../components/Reusables/WhiteButton.js'

// Auth
import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// Firestore
import { doc, getDoc, getDocs, collection, query, where, orderBy } from "firebase/firestore"
import { db } from '../firebase'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faBook, faPlay, faHouse, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

const Exercices = () => {
    // User data
    const [user] = useAuthState(auth)

    useEffect(() => {
        getUserClasses(user)
        getChapterList(userClasses[selectedClass])
        changeSelectedClassButton()
    })

    const [userClasses, setUserClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState(0)

    const changeSelectedClassButton = () => {
        for (let i = 0; i < userClasses.length; i++) {
            if (i===selectedClass) {
                document.getElementById("contentSidenavClassButton"+i).style.background = "#fff"
                document.getElementById("contentSidenavClassButton"+i).style.color = "#5541e9"
            } else {
                document.getElementById("contentSidenavClassButton"+i).style.background = "none"
                document.getElementById("contentSidenavClassButton"+i).style.color = "#fff"
            }
        }
    }

    const getUserClasses = async(u) => {
        let docRef = doc(db, "users", u.uid)
        let docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            if (!(userClasses.some(userClass => userClass.id === docSnap.data().id))) {
                setUserClasses(docSnap.data().classes)
            }
        } else {
            console.log("No document")
            return null
        }
    }

    const [chapters, setChapters] = useState([])

    const getChapterList = async(classname) => {
        const chapterCollection = collection(db, `classes/${classname}/chapitres`)
        const chapterQuery = query(chapterCollection, orderBy("order"))
        const chapterQuerySnapshot = await getDocs(chapterQuery)
        chapterQuerySnapshot.forEach((doc, index) => {
            if (!(chapters.some(chapter => chapter.id === doc.data().id))) {
                let docData = doc.data()
                docData["showed"] = false
                docData["exercices"] = []
                setChapters(current => [...current, docData])
            }
        })
    }

    const toggleChapter = async (chapterIndex) => {
        let chapterData = chapters
        if (chapters[chapterIndex].showed) {      
            document.getElementById("contentPageContentChapterMain"+chapterIndex).style.display = "none"
            document.getElementById("contentPageContentChapterTop"+chapterIndex).style.borderBottomLeftRadius = "25px"
            document.getElementById("contentPageContentChapterTop"+chapterIndex).style.borderBottomRightRadius = "25px"
            document.getElementById("contentPageContentChapterIconHide"+chapterIndex).style.display = "none"
            document.getElementById("contentPageContentChapterIconShow"+chapterIndex).style.display = "flex"
            chapterData[chapterIndex]["showed"] = false
        } else {
            document.getElementById("contentPageContentChapterMain"+chapterIndex).style.display = "flex"
            document.getElementById("contentPageContentChapterTop"+chapterIndex).style.borderBottomLeftRadius = "0"
            document.getElementById("contentPageContentChapterTop"+chapterIndex).style.borderBottomRightRadius = "0"
            document.getElementById("contentPageContentChapterIconHide"+chapterIndex).style.display = "flex"
            document.getElementById("contentPageContentChapterIconShow"+chapterIndex).style.display = "none"
            chapterData[chapterIndex]["showed"] = true
        }

        const exercicesCollection = collection(db, `classes/${userClasses[selectedClass]}/exercices`)
        const exercicesQuery = query(exercicesCollection, where("chapitre", '==' , chapterIndex))
        const exercicesQuerySnapshot = await getDocs(exercicesQuery)
        exercicesQuerySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
            let newDoc = {"id": doc.id, "exercice": doc.data()}
            let docExists = false
            for (let i = 0; i < chapterData[chapterIndex].exercices.length; i++) {
                if (chapters[chapterIndex].exercices[i].id === doc.id) {
                    docExists = true
                }
            }
            if (docExists === false) {
                chapterData[chapterIndex].exercices.push(newDoc)
            }
        })

        setChapters(chapterData)
        console.log(chapterData[chapterIndex].showed)
    }

    return <div className="exercicesPage">
        <div className="contentPageSidenav">
            <div className="contentPageSidenavSection">
                <h1 className="contentSidenavSectionTitle">Mes classes</h1>
                <div className="contentSidenavSectionButtons contentSidenavClassButtons">
                    {userClasses.map((userClass, index) => {
                        return <button key={index} id={"contentSidenavClassButton"+index} onClick={() => {
                            setSelectedClass(index)
                            setChapters([])
                            getChapterList(userClasses[index])
                        }} className="contentSidenavSectionButton">{userClass}</button>
                    })}
                </div>
            </div>

            <div className="contentPageSidenavSection">
                <h1 className="contentSidenavSectionTitle">Apprendre</h1>
                <div className="contentSidenavSectionButtons">
                    <WhiteButton text={<span><FontAwesomeIcon icon={faBook}/>&nbsp; Cours</span>}/>
                    <WhiteButton text={<span><FontAwesomeIcon icon={faPlay}/>&nbsp; Videos</span>} function={()=>{window.open("/videos", "_self")}}/>
                </div>
            </div>

            <div className="contentPageSidenavSection">
                <h1 className="contentSidenavSectionTitle">Navigation</h1>
                <div className="contentSidenavSectionButtons">
                    <WhiteButton text={<span><FontAwesomeIcon icon={faUser}/>&nbsp; Compte</span>} function={()=>{window.open("/authentication", "_self")}}/>
                    <WhiteButton text={<span><FontAwesomeIcon icon={faHouse}/>&nbsp; Retourner</span>} function={()=>{window.open("/", "_self")}}/>
                </div>
            </div>
        </div>

        <div className="contentPageContent">
            {chapters.map((chapter, index) => {
                        return <div id={"contentPageContentChapter"+index} className="contentPageContentChapter">
                            <div onClick={() => {toggleChapter(index)}} id={"contentPageContentChapterTop"+index} className="contentPageContentChapterTop">
                                <h1 className="contentPageContentChapterTitle">{chapter.title}</h1>
                                <FontAwesomeIcon id={"contentPageContentChapterIconShow"+index} className="contentPageContentChapterIcon" icon={faChevronDown}/>
                                <FontAwesomeIcon style={{display: "none"}} id={"contentPageContentChapterIconHide"+index}className="contentPageContentChapterIcon" icon={faChevronUp}/>
                            </div>

                            <div id={"contentPageContentChapterMain"+index} className="contentPageContentChapterMain">
                                {chapter.exercices.map((exercice) => {
                                    console.log(exercice)
                                    return <span>{exercice.exercice.chapitre}</span>
                                })}
                            </div>
                        </div>
                    })}
        </div>
    </div>
}

export default Exercices