import './App.css'
import { useRef } from "react"
import {Parallax, ParallaxLayer} from '@react-spring/parallax'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import './styles/Homepage.css'
import './styles/Trailerpage.css'
import './styles/Aboutpage.css'
import './styles/Contactpage.css'

// import Navbutton from './components/Navbutton.js'
import TutorCard from './components/TutorCard.js'
import Spacer from './components/Spacer.js'

import homeBackground from './img/background.png'
import aboutBackground from './img/aboutBackground.svg'
import trailerBackground from './img/trailerBackground.svg'

import homePageTransition from './img/transitions/homePageTransition.svg'
import aboutPageTransition from './img/transitions/aboutPageTransition.svg'

function App() {
  const ref = useRef()

  return (
    <div className="App">
      <Parallax pages={3} ref={ref}>
        {/* <ParallaxLayer
          offset={0}
          speed={1}
          sticky={{ start: 0, end: 2 }}
        >
          <div className="navBar">
            <image></image>
            <Navbutton title="Accueil" link="homePage"/>
            <Navbutton title="Trailer" link="trailerPage"/>
            <Navbutton title="About"/>
            <Navbutton title="Plans"/>
            <Navbutton title="Contact"/>
            <button>Login</button>
          </div>
        </ParallaxLayer> */}

        <ParallaxLayer
          offset={0}
          speed={0.2}
          factor={1}
          style={{
          backgroundImage: `url(${homeBackground})`,
          backgroundSize: 'cover',
          }}
        >
        </ParallaxLayer>

        <ParallaxLayer 
          offset={0}
          speed={2}
          factor={1}
          sticky={{ start: 0, end: 0.1 }}
        >
          <div className="homePage">
            <div className="leftHomePage">
              <h1 id="welcomeTitle">Bienvenue</h1>
              <p id="descriptionTitle">Améliorez vos compétences en mathématiques avec l'aide de nos tuteurs qualifiés. Que vous ayez besoin d'aide pour comprendre les concepts ou de soutien pour résoudre des problèmes, nous sommes là pour vous accompagner tout au long de votre parcours d'apprentissage.</p>
              <div className="homePageButtons">
                <button className="getStarted">Get started</button>
                <button className="toTrailerButton" onClick={() => ref.current.scrollTo(1)}>Voir trailer</button>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={0.2}
          factor={1}
        >
          <div className="rightHomePage">
            <img className="homePageImg" src={require('./img/homepage.png')} alt="Calculator"/>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.6}
          speed={0.2}
          factor={1}
        >
          <Spacer backgroundImage={homePageTransition} height="300"/>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.2}
          factor={1}
          style={{
            backgroundImage: `url(${trailerBackground})`,
          backgroundSize: 'cover',
        }}>
          <div className="trailerPage">
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.5}
          factor={1}
        >
          <div className="trailerPage">
            <div className="leftTrailerPage">
              <h1 className="trailerPageTitle">Trailer</h1>
              <p className="trailerPageDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
consequuntur! Commodi minima excepturi repudiandae velit hic maxime
doloremque. Quaerat provident commodi consectetur veniam similique ad 
earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
quasi aliquam eligendi, placeat qui corporis!
</p>
              <div className="leftSideTrailerButtons">
                <button className="trailerPlayButton"><FontAwesomeIcon icon={faPlay} />&nbsp; Watch now</button>
                <button className="toContactButton" onClick={() => ref.current.scrollTo(2)}>Apprendre plus sur nous</button>
              </div>
              <div className="rightSideTrailerButtons">

              </div>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.2}
          factor={1}
          style={{
            backgroundImage: `url(${aboutBackground})`,
            backgroundSize: 'cover',
          }}
        >
          <div className="aboutPage">
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.99}
          speed={0.2}
          factor={1}
        >
          <Spacer backgroundImage={aboutPageTransition} height="170"/>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={1.5}
        >
          <div className="aboutPage">
            <h1 className="aboutTitle">Notre équipe</h1>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={2}
          factor={1}
        >
          <div className="tutorCards">
            <TutorCard
              tutorName="Elias"
              tutorRole="Administrator"
              tutorDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
              molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
              numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
              optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
              obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
              nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
              tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
              quia.
              "
              tutorYear="Seconde"
            />
            <TutorCard
              tutorName="Ewenn"
              tutorRole="Administrator"
              tutorDescription="Egnjuioafnjuoajfoa"
              tutorYear="Seconde"
            />
            <TutorCard 
              tutorName="Louis"
              tutorRole="Tutor"
              tutorDescription="dfaedfjioahduifa hfuahj"
              tutorYear="Seconde"
            />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default App;
