import './ButtonStyles.css'

const GradientButton = (props) => {
    return <button className="gradientButton" onClick={props.function}>{props.text}</button>
}

GradientButton.defaultProps = {
    text: "Click",
    function: ()=>{alert("clicked")},
}

export default GradientButton