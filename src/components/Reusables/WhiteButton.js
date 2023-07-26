import './ButtonStyles.css'

const WhiteButton = (props) => {
    return <button className="whiteButton" onClick={props.function}>{props.text}</button>
}

WhiteButton.defaultProps = {
    text: "Click",
    function: ()=>{alert("clicked")},
}

export default WhiteButton