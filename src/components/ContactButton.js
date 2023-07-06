import '../styles/ContactButton.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactButton = (props) => {
    return <button onClick={()=>{window.open(`${props.link}`, props.link)}} className="contactButton"><FontAwesomeIcon className={`contactIcon ${props.iconName}`} icon={props.icon}/></button>
}

export default ContactButton