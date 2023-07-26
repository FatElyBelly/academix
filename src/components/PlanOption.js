import '../styles/Components/PlanOption.css'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const PlanOption = (props) => {
    const cardId = props.name + "Card"
    const cardTitle = props.name + "Title"

    let cardClicked = false
    const clickedCard = () => {
        if (cardClicked) {
            document.getElementById(cardId).style.backgroundColor = "#5541e9"
            document.getElementById(cardId).style.transform = "scale(1)"
            document.getElementById(cardId+"SubscribeButton").innerHTML = "Choisir"
            cardClicked = false
        } else {
            document.getElementById(cardId).style.backgroundColor = "#22DDFE"
            document.getElementById(cardId).style.transform = "scale(1.1)"
            document.getElementById(cardId+"SubscribeButton").innerHTML = "Pas choisir"
            cardClicked = true
        }
    }

    return <div className={"planCard " + props.variation} id={cardId}>
        <h1 className="planCardTitleW" style={{color: "#fff"}} id={cardTitle}>{props.name}</h1>
        <div className={"planCardInnerContent " + props.variation}>
            <div className={"priceDiv " + props.variation}>
                <h1 className={"priceText " + props.variation}>€ {props.price}</h1>
            </div>
            <div className="planFeaturesList">
                <p className={"planCardText " + props.variation}>{props.addition}</p>
                {props.featureList.map((feature) => {
                    return (
                        <p className={"planFeature " + props.variation}><FontAwesomeIcon className={"planFeatureIcon " + props.variation} icon={faCheck}/>&nbsp;{feature}</p>
                    )
                })}
            </div>
            <button className={"planSubscribeButton " + props.variation} id={cardId + "SubscribeButton"} onClick={clickedCard}>Choisir</button>
        </div>
        
        
    </div>
}

export default PlanOption