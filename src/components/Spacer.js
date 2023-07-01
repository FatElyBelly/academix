import '../styles/Spacer.css'

const Spacer = (props) => {
    return <div className="spacer" style={{
        backgroundImage: `url(${props.backgroundImage})`,
        'aspectRatio': `960/${props.height}`,
    }}></div>
}

export default Spacer