// Import styles
import '../styles/Authentication.css'

// Components
import QuickButton from '../components/QuickButton';

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

const Authentication = () => {

    let currentPageLogin = true

    let showPassword = () => {
        let pswInput;
        if (currentPageLogin) {
            pswInput = document.getElementById("loginPasswordInput");
            if (pswInput.type === "password") {
                pswInput.type = "text";
                document.getElementById("loginShowPasswordIcon").style.display = "none"
                document.getElementById("loginHidePasswordIcon").style.display = "block"
            } else {
                pswInput.type = "password";
                document.getElementById("loginShowPasswordIcon").style.display = "block"
                document.getElementById("loginHidePasswordIcon").style.display = "none"
            }
        } else {
            pswInput = document.getElementById("signupPasswordInput");
            if (pswInput.type === "password") {
                pswInput.type = "text";
                document.getElementById("signupShowPasswordIcon").style.display = "none"
                document.getElementById("signupHidePasswordIcon").style.display = "block"
            } else {
                pswInput.type = "password";
                document.getElementById("signupShowPasswordIcon").style.display = "block"
                document.getElementById("signupHidePasswordIcon").style.display = "none"
            }
        }
    }

    let changePage = () => {
        if (currentPageLogin) {
            document.getElementById("loginPage").style.zIndex = "5"
            document.getElementById("loginPage").style.opacity = ".5"
            document.getElementById("loginPage").style.marginRight = "-20vw"
            document.getElementById("loginPage").style.height = "80vh"
            document.getElementById("loginPage").style.pointerEvents = "none"

            document.getElementById("signupPage").style.zIndex = "10"
            document.getElementById("signupPage").style.opacity = "1"
            document.getElementById("signupPage").style.marginLeft = "0"
            document.getElementById("signupPage").style.height = "90vh"
            document.getElementById("signupPage").style.pointerEvents = "all"

            currentPageLogin = false
        } else {
            document.getElementById("loginPage").style.zIndex = "10"
            document.getElementById("loginPage").style.opacity = "1"
            document.getElementById("loginPage").style.marginRight = "0"
            document.getElementById("loginPage").style.height = "90vh"
            document.getElementById("loginPage").style.pointerEvents = "all"

            document.getElementById("signupPage").style.zIndex = "5"
            document.getElementById("signupPage").style.opacity = ".5"
            document.getElementById("signupPage").style.marginLeft = "-20vw"
            document.getElementById("signupPage").style.height = "80vh"
            document.getElementById("signupPage").style.pointerEvents = "none"

            currentPageLogin = true
        }
    }

    return <div className="authPage">
        <div className="loginContent" id="loginPage">
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
                                id="loginPasswordInput"
                                />
                            <FontAwesomeIcon id="loginShowPasswordIcon" onClick={showPassword} className="showPasswordIcon" icon={faEye}/>
                            <FontAwesomeIcon id="loginHidePasswordIcon" onClick={showPassword} className="showPasswordIcon" icon={faEyeSlash}/>
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
                    <a className="toSignupLink" onClick={changePage}>Pas de compte? Creer un</a>
                </div>
            </div>
        </div>




        <div className="signupContent" id="signupPage">
            <div className="authContent">
                <h1 className="authContentTitle">Signup</h1>

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
                                id="signupPasswordInput"
                                />
                            <FontAwesomeIcon id="signupShowPasswordIcon" onClick={showPassword} className="showPasswordIcon" icon={faEye}/>
                            <FontAwesomeIcon id="signupHidePasswordIcon" onClick={showPassword} className="showPasswordIcon" icon={faEyeSlash}/>
                            </div>
                        </div>

                        <div className="authInputWrapDiv">
                            <label className="authInputLabel">Verification mot de passe</label>
                            <div className="authInputDiv">
                            <FontAwesomeIcon className="authInputIcon" icon={faLock}/>
                                <input
                                type="password"
                                label="Create password"
                                placeholder="Recopier le mot de passe"
                                className="authInput"
                                id="signupPasswordInput"
                                />
                            <FontAwesomeIcon id="signupShowPasswordIcon" onClick={showPassword} className="showPasswordIcon" icon={faEye}/>
                            <FontAwesomeIcon id="signupHidePasswordIcon" onClick={showPassword} className="showPasswordIcon" icon={faEyeSlash}/>
                            </div>
                        </div>

                        <div className="loginButtonDiv">
                            <button className="loginButton" type="submit">CRÉER MON COMPTE</button>
                        </div>
                        
                    </form>
                </div>

                <div className="authContentOther">
                    <span>Ou créer un compte avec</span>
                    <div className="otherLoginMethods">
                        <QuickButton type="circle" icon={faGoogle} iconName="google" link=""/>
                        <QuickButton type="circle" icon={faFacebookF} iconName="facebook" link=""/>
                    </div>
                </div>

                <div className="toSignupDiv">
                    <a className="toSignupLink" onClick={changePage}>Déjà un compte? Se connecter</a>
                </div>
            </div>
        </div>
    </div>
}

export default Authentication