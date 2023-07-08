// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import '../styles/ContactButton.css'

const ContactButton = (props) => {
    const contactOpen = () => {
        let textElement = document.getElementsByClassName(props.name)[1]
        textElement.style.display = 'block'
        textElement.textContent = props.text
    }

    const contactClose = () => {
        let textElement = document.getElementsByClassName(props.name)[1]
        textElement.textContent = ''
        textElement.style.display = 'none'
    }

    return <div className="contactElement">
        <button className={`contactElementButton ${props.name}`} onMouseOver={contactOpen} onMouseLeave={contactClose} onClick={() => {window.open(props.link)}}>
            <FontAwesomeIcon icon={props.icon} className="contactElementIcon"></FontAwesomeIcon>
            <p className={`contactElementText ${props.name}`}></p>
        </button>
    </div>
}

export default ContactButton