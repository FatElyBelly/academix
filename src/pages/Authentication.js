import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'

// Auth
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
// Google auth
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

// Import styles
import '../styles/Authentication.css'

// Components
import QuickButton from '../components/QuickButton'
import Signout from '../pages/Signout.js'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

// Animations
import Lottie from 'lottie-react'
import animationData from '../img/animations/7Ywh6JcZ2l.json'

const provider = new GoogleAuthProvider()

const Authentication = () => {
    const [user] = useAuthState(auth)

    //Animations
    const loginCheckRef = useRef()
    const signupCheckRef = useRef()
    const playLoginAnimation = () => {
        document.getElementById("loginCheckAnimation").style.display = "block"
        loginCheckRef.current.goToAndPlay(0)
        document.getElementById("authContentInputs").style.display = "none"
        document.getElementById("authContentOther").style.display = "none"
        document.getElementById("toSignupDiv").style.display = "none"
    }
    const playSignupAnimation = () => {
        document.getElementById("signupCheckAnimation").style.display = "block"
        signupCheckRef.current.goToAndPlay(0)
        document.getElementById("signupAuthContentInputs").style.display = "none"
        document.getElementById("signupAuthContentOther").style.display = "none"
        document.getElementById("toLoginDiv").style.display = "none"
    }

    const navigate = useNavigate();

    // Login functions
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let [justSigned, setJustSigned] = useState(false);

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            setJustSigned(true)
            const user = userCredential.user
            console.log(user)
            // Show animation
            playLoginAnimation()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

    const googleLogin = () => {
        signInWithPopup(auth, provider).then((result) => {
            // The signed-in user info.
            const user = result.user
            console.log(user)
        }).catch((error) => {
            // Handle Errors here.
        });
    }

    // Signup functions
    const [signEmail, signSetEmail] = useState('')
    const [signPassword, signSetPassword] = useState('');
 
    const onSignup = async (b) => {
      b.preventDefault()
     
      await createUserWithEmailAndPassword(auth, signEmail, signPassword)
        .then((userCredential) => {
            // Signed in
            setJustSigned(true)
            const user = userCredential.user;
            console.log(user);
            // Show animation
            playSignupAnimation()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
    }

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
        let smartphone = window.matchMedia("(max-width: 320px)")
        let ipad = window.matchMedia("(min-device-width: 768px)") && window.matchMedia("(max-device-width: 1024px)")
        let desktop = window.matchMedia("(min-width: 1224px)")
        let changeWidth = "-20vw"
        if (smartphone.matches) {
            console.log("smartphone")
            changeWidth = "-85vw"
        } else if (ipad.matches) {
            console.log("ipad")
            changeWidth = "-45vw"
        } else if (desktop.matches) {
            console.log("desktop")
            changeWidth = "-20vw"
        }
        
        if (currentPageLogin) {
            document.getElementById("loginPage").style.zIndex = "5"
            document.getElementById("loginPage").style.opacity = ".5"
            document.getElementById("loginPage").style.marginRight = changeWidth
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
            document.getElementById("signupPage").style.marginLeft = changeWidth
            document.getElementById("signupPage").style.height = "80vh"
            document.getElementById("signupPage").style.pointerEvents = "none"

            currentPageLogin = true
        }
    }

    if (!user || justSigned){
        return <div className="authPage">
            <div className="loginContent" id="loginPage">
                <div className="authContent">
                    <h1 className="authContentTitle">Connexion</h1>

                    <div className="authContentInputs" id="authContentInputs">
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
                                    onChange={(e)=>setEmail(e.target.value)}
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
                                    onChange={(e)=>setPassword(e.target.value)}
                                    />
                                <FontAwesomeIcon id="loginShowPasswordIcon" onClick={showPassword} className="showPasswordIcon" icon={faEye}/>
                                <FontAwesomeIcon id="loginHidePasswordIcon" onClick={showPassword} className="showPasswordIcon" icon={faEyeSlash}/>
                                </div>
                            </div>

                            <div className="forgotPassword">
                                <a href="/" className="forgotPasswordLink">Mot de passe oublié?</a>
                            </div>

                            <div className="loginButtonDiv">
                                <button className="loginButton" onClick={onLogin}>SE CONNECTER</button>
                            </div>
                            
                        </form>
                    </div>

                    <div className="authContentOther" id="authContentOther">
                        <span>Ou se connecter avec</span>
                        <div className="otherLoginMethods">
                            <QuickButton click={googleLogin} type="circle" icon={faGoogle} iconName="google"/>
                            <QuickButton type="circle" icon={faFacebookF} iconName="facebook"/>
                        </div>
                    </div>

                    <div className="toSignupDiv" id="toSignupDiv">
                        <p className="toSignupLink" onClick={changePage}>Pas de compte? Creer un</p>
                    </div>
                    <Lottie onComplete={() => {navigate("/")}}id="loginCheckAnimation" lottieRef={loginCheckRef} loop={false} autoplay={false} animationData={animationData}/>
                </div>
            </div>




            <div className="signupContent" id="signupPage">
                <div className="authContent">
                    <h1 className="authContentTitle">Signup</h1>

                    <div className="authContentInputs" id="signupAuthContentInputs">
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
                                    required
                                    onChange={(b) => signSetEmail(b.target.value)}
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
                                    required
                                    onChange={(b) => signSetPassword(b.target.value)}
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
                                    id="signupVerifyPasswordInput"
                                    />
                                <FontAwesomeIcon id="signupShowPasswordIcon" onClick={showPassword} className="showPasswordIcon" icon={faEye}/>
                                <FontAwesomeIcon id="signupHidePasswordIcon" onClick={showPassword} className="showPasswordIcon" icon={faEyeSlash}/>
                                </div>
                            </div>

                            <div className="loginButtonDiv">
                                <button className="loginButton" onClick={onSignup}>CRÉER MON COMPTE</button>
                            </div>
                            
                        </form>
                    </div>

                    <div className="authContentOther" id="signupAuthContentOther">
                        <span>Ou créer un compte avec</span>
                        <div className="otherLoginMethods">
                            <QuickButton click={googleLogin} type="circle" icon={faGoogle} iconName="google" link=""/>
                            <QuickButton type="circle" icon={faFacebookF} iconName="facebook" link=""/>
                        </div>
                    </div>

                    <div className="toSignupDiv" id="toLoginDiv">
                        <p className="toSignupLink" onClick={changePage}>Déjà un compte? Se connecter</p>
                    </div>
                    <Lottie onComplete={() => {navigate("/")}} id="signupCheckAnimation" lottieRef={signupCheckRef} loop={false} autoplay={false} animationData={animationData}/>
                </div>
            </div>
        </div>
    } else {
        return <Signout/>
    }
}

export default Authentication