// Styles
import '../styles/Signout.css'

// Auth
import { signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';


const Signout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {               
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    return <div className="signoutPage">
        <div className="signoutMain">
            <h1 className="signoutTitle">Vous êtes connecté.</h1>
            <button onClick={handleLogout} className="signoutButton">SE DECONNECTER</button>
            <button onClick={() => {navigate("/")}} className="signoutButton">PAGE D'ACCUEIL</button>
        </div>
    </div>
}

export default Signout