import '../styles/ContactButton.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuickButton = (props) => {
    if (props.type === "circle"){
        return <button onClick={()=>{window.open(`${props.link}`, props.link)}} className={`contactButtonCircle ${props.iconName}`}><FontAwesomeIcon className="contactIconCircle" icon={props.icon}/></button>
    } else {
        return <button onClick={()=>{window.open(`${props.link}`, props.link)}} className="contactButton"><FontAwesomeIcon className={`contactIcon ${props.iconName}`} icon={props.icon}/></button>
    }
    
}

export default QuickButton