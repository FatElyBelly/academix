import '../styles/Components/PlanOption.css'

const PlanOption = (props) => {
    const cardId = props.planName + "Card"
    const cardTitle = props.planName + "Title"

    let cardClicked = false
    const clickedCard = () => {
        if (cardClicked) {
            document.getElementById(cardId).style.backgroundColor = "#fff"
            document.getElementById(cardTitle).style.color = "#5541e9"
            document.getElementById(cardId).style.transform = "scale(1)"
            cardClicked = false
        } else {
            document.getElementById(cardId).style.backgroundColor = "#22DDFE"
            document.getElementById(cardTitle).style.color = "#fff"
            document.getElementById(cardId).style.transform = "scale(1.1)"
            cardClicked = true
        }
    }

    return <div className="planCard" id={cardId} onClick={clickedCard}>
        <h1 id={cardTitle}>{props.planName}</h1>
    </div>
}

export default PlanOption