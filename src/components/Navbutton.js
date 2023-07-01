import '../styles/Navbar.css'

const Navbutton = (props) => {
    return <div>
        <a href={'#' + props.link}><button className="navButton"><p className="navLink">{props.title}</p></button></a>
    </div>
}

export default Navbutton