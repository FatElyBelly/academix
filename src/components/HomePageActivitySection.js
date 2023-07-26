// Style
import '../styles/Components/HomePageActivitySection.css'

// Buttons
import WhiteButton from './Reusables/WhiteButton.js'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from "@fortawesome/free-solid-svg-icons"

const HomePageActivitySection = (props) => {
    if (props.unlocked) {
        return <div className={`homePageActivitySectionUnlocked ${props.difBackground}`}>
            <h1 className="homePageActivitySectionText">{props.title}</h1>
            <FontAwesomeIcon className="homePageActivitySectionIconUnlocked" icon={props.icon}/>
            <WhiteButton text="Voir" function={()=>{window.open("/" + props.openPage, "_self")}}/>
        </div>
    } else {
        return <div className="homePageActivitySection">
            <FontAwesomeIcon className="homePageActivitySectionIcon" icon={faLock}/>
            <h1 className="homePageActivitySectionText">Achetez un abonnement {props.subType}</h1>
            <WhiteButton text="Voir" function={()=>{window.open("/abonnements", "_self")}}/>
        </div>
    }
}

export default HomePageActivitySection