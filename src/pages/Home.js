// Auth
import { signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {               
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out successfully")
            navigate("/")
        }).catch((error) => {
        // An error happened.
        });
    }

    return <div>Homepage y a rien pr linstant <button onClick={handleLogout}>Signout</button></div>
}

export default Home