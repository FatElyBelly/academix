// Style
import '../styles/Components/HomePageActivitySection.css'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from "@fortawesome/free-solid-svg-icons"

const HomePageActivitySection = (props) => {
    if (props.unlocked) {
        return <div className="homePageActivitySectionUnlocked">
            <h1 className="homePageActivitySectionText">{props.title}</h1>
            <FontAwesomeIcon className="homePageActivitySectionIconUnlocked" icon={props.icon}/>
            <button onClick={()=>{window.open("/" + props.openPage, "_self")}} className="homePageActivitySectionButton">Voir</button>
        </div>
    } else {
        return <div className="homePageActivitySection">
            <FontAwesomeIcon className="homePageActivitySectionIcon" icon={faLock}/>
            <h1 className="homePageActivitySectionText">Achetez un abonnement {props.subType}</h1>
            <button onClick={()=>{window.open("/abonnements", "_self")}} className="homePageActivitySectionButton">Voir</button>
        </div>
    }
}

export default HomePageActivitySection