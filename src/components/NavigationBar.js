import '../styles/Components/Navbar.css'
import { useState } from 'react'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faUser, faCaretDown, faCaretUp, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

const NavigationBar = (props) => {

    let navBarOpen = true
    let [menuIcon, setMenuIcon] = useState(faCaretUp)

    const switchNavBar = () => {
        let navLinks = document.getElementsByClassName("navLinkInteract")
        if (navBarOpen) {
            // Nav bar is open -> close it
            document.getElementById("navBar").style.height = "5vh"
            for (let i=0; i<navLinks.length; i++) {
                document.getElementsByClassName("navLinkInteract")[i].style.display = "none"
            }
            setMenuIcon(faCaretDown)
            navBarOpen = false
        } else {
            // Nav bar is closed -> open it
            document.getElementById("navBar").style.height = "92vh"
            for (let i=0; i<navLinks.length; i++) {
                document.getElementsByClassName("navLinkInteract")[i].style.display = "block"
            }
            setMenuIcon(faCaretUp)
            navBarOpen = true
        }
    }

    return <div className="navBar" id="navBar">
        <button className="navLinkButton" onClick={switchNavBar}><FontAwesomeIcon className="navLinkIcon" icon={menuIcon}/></button>
        <button className="navLinkButton navLinkInteract"><FontAwesomeIcon className="navLinkIcon" icon={faHome}/></button>
        <button className="navLinkButton navLinkInteract"><FontAwesomeIcon className="navLinkIcon" icon={faUser}/></button>
        <button className="navLinkButton navLinkInteract"><FontAwesomeIcon className="navLinkIcon" icon={faUser}/></button>
        <button className="navLinkButton navLinkInteract"><FontAwesomeIcon className="navLinkIcon" icon={faUser}/></button>
        <button className="navLinkButton navLinkInteract" onClick={props.signout}><FontAwesomeIcon className="navLinkIcon" icon={faRightFromBracket}/></button>
    </div>
}

export default NavigationBar