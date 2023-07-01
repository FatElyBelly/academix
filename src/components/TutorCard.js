import '../styles/TutorCard.css'

const TutorCard = (props) => {
    const cardId = props.tutorName + "Card"
    const rightSideCardId = props.tutorName + "RightSideCard"
    const cardBtnId = props.tutorName + "CardBtn"
    let cardOpen = false

    const openCard = () => {
        // Card properties
        document.getElementById(cardId).style.width = "31vw"
        document.getElementById(cardBtnId).innerHTML = "Voir moins"
        document.getElementById(cardBtnId).style.borderTopRightRadius = "25px"
        document.getElementById(cardBtnId).style.borderBottomRightRadius = "0"
        
        // Card content
        document.getElementById(rightSideCardId).style.animation = "appearAnim 1s ease-in"
        
        
        document.getElementById(rightSideCardId).style.display = "flex"
        
        // Change card state
        cardOpen = true
    }

    const closeCard = () => {
        // Card properties
        document.getElementById(cardId).style.width = "12vw"
        document.getElementById(cardBtnId).innerHTML = "Voir plus"
        document.getElementById(cardBtnId).style.borderTopRightRadius = "0"
        document.getElementById(cardBtnId).style.borderBottomRightRadius = "25px"
        
        // Card content
        document.getElementById(rightSideCardId).style.display = "none"
        
        // Change card state
        cardOpen = false
    }

    return <div className="tutorCard" id={cardId}>
        <div className="leftTutorCard">
            <h3 className="tutorTitle">{props.tutorName}</h3>
            <img className="tutorImg" alt="img" src={require('../img/tutors/example.png')}/>
            <button className="tutorCardBtn" id={cardBtnId} onClick={() => {
                if (cardOpen) {
                    closeCard()
                } else {
                    openCard()
                }
            }}>Voir plus</button>
        </div>

        <div className="rightTutorCard" id={rightSideCardId}>
            <h3 className="tutorTitle">{props.tutorRole}</h3>
            <p className="tutorDescription">{props.tutorDescription}</p>
            <p className="tutorYear">En classe de {props.tutorYear}</p>
        </div>
    </div>
}

export default TutorCard