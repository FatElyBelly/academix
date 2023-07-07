// Import styles
import '../styles/Authentication.css'

// Components
import QuickButton from '../components/QuickButton';

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

const Authentication = () => {
    return <div className="authPage">
        <div className="mainContent">
            <div className="authContent">
                <h1 className="authContentTitle">Connexion</h1>

                <div className="authContentInputs">
                    <form className="authContentInputs">
                        <div className="authInputWrapDiv">
                            <label className="authInputLabel">Addresse mail</label>
                            <div className="authInputDiv">
                                <FontAwesomeIcon className="authInputIcon" icon={faEnvelope}/>
                                <input
                                type="email"
                                label="Email address"
                                placeholder="Entrer l'addresse mail"
                                className="authInput"
                                />
                            </div>
                        </div>
                        
                        <div className="authInputWrapDiv">
                            <label className="authInputLabel">Mot de passe</label>
                            <div className="authInputDiv">
                            <FontAwesomeIcon className="authInputIcon" icon={faLock}/>
                                <input
                                type="password"
                                label="Create password"
                                placeholder="Entrer le mot de passe"
                                className="authInput"
                                />
                            </div>
                        </div>

                        <div className="forgotPassword">
                            <a className="forgotPasswordLink">Mot de passe oublié?</a>
                        </div>

                        <div className="loginButtonDiv">
                            <button className="loginButton" type="submit">SE CONNECTER</button>
                        </div>
                        
                    </form>
                </div>

                <div className="authContentOther">
                    <span>Ou se connecter avec</span>
                    <div className="otherLoginMethods">
                        <QuickButton type="circle" icon={faGoogle} iconName="google" link=""/>
                        <QuickButton type="circle" icon={faFacebookF} iconName="facebook" link=""/>
                    </div>
                </div>

                <div className="toSignupDiv">
                    <a className="toSignupLink">Pas de compte? Creer un</a>
                </div>
            </div>
        </div>
    </div>
}

export default Authentication