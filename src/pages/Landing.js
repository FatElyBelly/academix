import { useRef } from "react"
import {Parallax, ParallaxLayer} from '@react-spring/parallax'

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faArrowRight } from "@fortawesome/free-solid-svg-icons";
// Contact icons
import {faEnvelope} from "@fortawesome/free-solid-svg-icons"
import { faInstagram, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'


// Styles
import '../styles/HomePage.css'
import '../styles/TrailerPage.css'
import '../styles/AboutPage.css'
import '../styles/ContactPage.css'

// Components
import TutorCard from '../components/TutorCard.js'
import Spacer from '../components/Spacer.js'
import QuickButton from '../components/QuickButton.js'

// Wallpapers
import homeBackground from '../img/backgrounds/homepageBackground.png'
import trailerBackground from '../img/backgrounds/trailerBackground.svg'
import aboutBackground from '../img/backgrounds/aboutBackground.svg'
import contactBackground from '../img/backgrounds/contactBackground.svg'

// Transitions
import homePageTransition from '../img/transitions/homePageTransition.svg'
import aboutPageTransition from '../img/transitions/aboutPageTransition.svg'
import contactPageTransition from '../img/transitions/contactPageTransition.svg'

const Landing = () => {
    const ref = useRef()
    return <Parallax pages={4} ref={ref}>

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
          <h1 id="welcomeTitle">Academix</h1>
          <p id="descriptionTitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium.</p>
          <div className="homePageButtons">
            <button className="toTrailerButton" onClick={() => ref.current.scrollTo(1)}>Voir trailer</button>
            <a href="/authentication" target="_blank"><button className="getStarted">Get started &nbsp;<FontAwesomeIcon icon={faArrowRight} fade /></button></a>
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
        <img className="homePageImg" src={require('../img/backgrounds/homepage.png')} alt="Calculator"/>
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
          tutorRole="Admin / Développeur Web"
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
          tutorRole="Admin"
          tutorDescription="Egnjuioafnjuoajfoa"
          tutorYear="Seconde"
        />
        <TutorCard 
          tutorName="Louis"
          tutorRole="Admin / Designer"
          tutorDescription="dfaedfjioahduifa hfuahj"
          tutorYear="Seconde"
        />
      </div>
    </ParallaxLayer>

    <ParallaxLayer
      offset={2.78}
      speed={0.2}
      factor={1}
    >
      <Spacer backgroundImage={contactPageTransition} height="200"/>
    </ParallaxLayer>

    <ParallaxLayer
      offset={3}
      speed={0.2}
      factor={1}
      style={{
        backgroundImage: `url(${contactBackground})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="contactPage">
      </div>
    </ParallaxLayer>

    <ParallaxLayer
      offset={3}
      speed={1.5}
    >
      <div className="contactPage">
        <h1 className="contactTitle">Contact</h1>
      </div>
    </ParallaxLayer>

    <ParallaxLayer
      offset={3}
      speed={2}
    >
      <div className="contactButtons">
        <QuickButton type="simple" icon={faInstagram} iconName="instagram" link="https://www.instagram.com/elias.helfand/"/>
        <QuickButton type="simple" icon={faEnvelope} iconName="envelope" link=""/>
        <QuickButton type="simple" icon={faWhatsapp} iconName="whatsapp" link=""/>
        <QuickButton type="simple" icon={faTwitter} iconName="twitter" link=""/>
      </div>
    </ParallaxLayer>
  </Parallax>
}

export default Landing