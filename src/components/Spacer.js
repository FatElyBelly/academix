import { ParallaxLayer } from '@react-spring/parallax'
import '../styles/Components/Spacer.css'

const Spacer = (props) => {
    return <ParallaxLayer
        offset={props.offset}
        speed={0.2}
        factor={props.factor}
        style={{
            backgroundImage: `url(${props.backgroundImage})`,
            backgroundSize: 'cover',
        }}
    ></ParallaxLayer>
}

export default Spacer