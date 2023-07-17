import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'

// Auth
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
// Google auth
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

// Firestore
import { query, doc, setDoc, getDocs, collection, where } from "firebase/firestore"
import { db } from '../firebase'

// Import styles
import '../styles/Authentication.css'
import '../styles/Components/AlertBox.css'

// Components
import QuickButton from '../components/QuickButton'
import Signout from '../pages/Signout.js'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faEye, faEyeSlash, faXmark, faUser } from "@fortawesome/free-solid-svg-icons"
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

// Animations
import Lottie from 'lottie-react'
import animationData from '../img/animations/check1.json'

const provider = new GoogleAuthProvider()

const Authentication = () => {
    // User docs
    const [user] = useAuthState(auth)

    //Animations
    const loginCheckRef = useRef()
    const signupCheckRef = useRef()
    const playLoginAnimation = () => {
        document.getElementById("loginCheckAnimation").style.display = "block"
        loginCheckRef.current.setSpeed(1.5)
        loginCheckRef.current.goToAndPlay(0)
        document.getElementById("loginButtonDiv").style.display = "none"
        document.getElementById("authContentOther").style.display = "none"
        document.getElementById("toSignupDiv").style.display = "none"
    }

    const playSignupAnimation = () => {
        document.getElementById("signupCheckAnimation").style.display = "block"
        loginCheckRef.current.setSpeed(1.5)
        signupCheckRef.current.goToAndPlay(0)
        document.getElementById("signupButtonDiv").style.display = "none"
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
            console.log(userCredential.user)
            // Show animation
            playLoginAnimation()
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found" || errorCode === "auth/invalid-email") {
                console.log("Wrong credentials")
                openAlertBox("Identifiants invalides", "Erreur de connexion: votre addresse mail ou votre mot de passe est incorrecte.")
            }
            console.log(errorCode)
        });
    }

    const googleLogin = async () => {

        try {
            const res = await signInWithPopup(auth, provider);
            const newUser = res.user;
            setJustSigned(true)
            const userQuery = query(collection(db, "users"), where("uid", "==", newUser.uid));
            const docs = await getDocs(userQuery);
            if (docs.docs.length === 0) {
                signSetUsername(res.user.displayName)
                adduser(newUser, true)
            }
            playLoginAnimation()
        } catch (err) {
            console.error(err);
        }
    }

    const [signEmail, signSetEmail] = useState('')
    const [signPassword, signSetPassword] = useState('')
    const [signUsername, signSetUsername] = useState('')
    const [signVerifyPassword, signSetVerifyPassword] = useState('')

    const adduser = async (u, withGoogle) => {
        try {
            if (withGoogle) {
                await setDoc(doc(db, "users", u.uid), {
                    email: u.email,
                    username: u.displayName,
                    uid: u.uid,
                    subscription: "none",
                    method: "google",
                })
            } else {
                await setDoc(doc(db, "users", u.uid), {
                    email: u.email,
                    username: signUsername,
                    uid: u.uid,
                    subscription: "none",
                    method: "email",
                })
            }
            
        } catch(error) {
            console.log(error)
        }
    }
 
    const onSignup = async (b) => {
      b.preventDefault()
      if (signPassword === signVerifyPassword) {
        await createUserWithEmailAndPassword(auth, signEmail, signPassword)
        .then((userCredential) => {
            // Signed in
            setJustSigned(true)
            adduser(userCredential.user, false)
            console.log(userCredential.user);
            // Show animation
            playSignupAnimation()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        })
      } else {
        openAlertBox("dsadjias0", "The passwords don't match")
      }
      
    }

    const [currentPageLogin, setCurrentPageLogin] = useState(true)

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

            setCurrentPageLogin(false)
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

            setCurrentPageLogin(true)
        }
    }

    let openAlertBox = (title, text) => {
        // document.getElementById("wrongCredentials").style.display = "flex"
        document.getElementById("wrongCredentials").style.top = "2vh"
        document.getElementById("alertTitle").innerHTML = title
        document.getElementById("alertText").innerHTML = text
    }

    let closeAlertBox = () => {
        // document.getElementById("wrongCredentials").style.display = "none"
        document.getElementById("wrongCredentials").style.top = "-20vh"
    }

    if (!user || justSigned){
        return <div className="authPage">
            <div className="alertContainer" id="wrongCredentials">
                <div className="alertBox">
                    <FontAwesomeIcon onClick={closeAlertBox} className="alertClose" icon={faXmark}/>
                    <h1 id="alertTitle" className="alertTitle">Error</h1>
                    <p id="alertText" className="alertText"></p>
                </div>
            </div>
            <div className="loginContent" id="loginPage">
                <div className="authContent">
                    <h1 className="authContentTitle">Connexion</h1>

                    <div className="authContentInputs" id="authContentInputs">
                        <form className="authContentInputs">
                            <div className="authInputWrapDiv">
                                <label className="authInputLabel">Addresse mail</label>
                                <div className="authInputDiv loginAuthInputDiv">
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
                                <div className="authInputDiv loginAuthInputDiv">
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

                            <div className="loginButtonDiv" id="loginButtonDiv">
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
                    <Lottie onComplete={() => {navigate("/")}} id="loginCheckAnimation" lottieRef={loginCheckRef} loop={false} autoplay={false} animationData={animationData}/>
                </div>
            </div>




            <div className="signupContent" id="signupPage">
                <div className="authContent">
                    <h1 className="authContentTitle">Signup</h1>

                    <div className="authContentInputs" id="signupAuthContentInputs">
                        <form className="authContentInputs">
                            <div className="authInputWrapDiv">
                                <label className="authInputLabel">Addresse mail</label>
                                <div className="authInputDiv signupAuthInputDiv">
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
                                <label className="authInputLabel">Identifiant</label>
                                <div className="authInputDiv signupAuthInputDiv">
                                    <FontAwesomeIcon className="authInputIcon" icon={faUser}/>
                                    <input
                                    type="email"
                                    label="Username"
                                    placeholder="Entrer l'identifiant"
                                    className="authInput"
                                    required
                                    onChange={(b) => signSetUsername(b.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div className="authInputWrapDiv">
                                <label className="authInputLabel">Mot de passe</label>
                                <div className="authInputDiv signupAuthInputDiv">
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
                                    required
                                    onChange={(b) => signSetVerifyPassword(b.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="loginButtonDiv" id="signupButtonDiv">
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