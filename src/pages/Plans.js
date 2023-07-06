// Styles
import '../styles/PlansPage.css'

// Components
import PlanOption from '../components/PlanOption.js'
import TutorCard from '../components/TutorCard.js'

const Plans = () => {

    let currentStep = 0
    const nextStep = () => {
        // Increase step
        if (currentStep<4){
            currentStep++
            // Animate text
            let steps = document.getElementsByClassName("eachStep")
            for (let i=0; i<currentStep; i++) {
                steps[i].style.opacity = "1"
            }
    
            // Animate progress bar
            let currentProgressLineWidth = document.getElementById("progressLine").style.width.replace('%', '')
            let progressLineWidth = Number(currentProgressLineWidth) + 25
            document.getElementById("progressLine").style.width = progressLineWidth.toString() + '%'
        
            // Show current page
            let totalPages = document.getElementsByClassName("pageSection")
            for (let j=0; j<totalPages.length; j++) {
                if (j===currentStep) {
                    totalPages[j].style.display = "flex"
                } else {
                    totalPages[j].style.display = "none"
                }
            }
        }
    }
    return <div className="plansPage">
        <div className="pageContent">
            <div className="stepsTaken">
                <h1 className="eachStep">1. Plan</h1>
                <h1 className="eachStep">2. Planning</h1>
                <h1 className="eachStep">3. Tuteur</h1>
                <h1 className="eachStep">4. Paiement</h1>
            </div>
            <div className="progressBar">
                <div className="lineBox">
                    <div className="line" id="progressLine"></div>
                </div>
            </div>
            <div className="contentDiv">
                <div className="pageSection" id="section0" style={{display: "flex"}}>
                <h1>Introduction</h1>
                </div>
                <div className="pageSection plansSection" id="section1" style={{display: "none"}}>
                    <div className="planOptions">
                        <PlanOption planName="Basic"></PlanOption>
                        <PlanOption planName="Plus"></PlanOption>
                        <PlanOption planName="Premium"></PlanOption>
                        <PlanOption planName="Idfk what"></PlanOption>
                        <PlanOption planName="Idfk again"></PlanOption>
                    </div>
                </div>
                <div className="pageSection" id="section1" style={{display: "none"}}>
                    <h1>Section 2</h1>
                </div>
                <div className="pageSection" id="section1" style={{display: "none"}}>
                    <div className="tutorOptionsBox">
                        <button>Left</button>
                        <div className="tutorOptionsCarousel">
                            <div className="tutorOptionsRow">
                                <TutorCard
                                tutorName="Un mec"
                                tutorRole="Administrator"
                                tutorDescription='"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia."'
                                tutorYear="Seconde"
                                />
                                <TutorCard
                                tutorName="Un autre"
                                tutorRole="Administrator"
                                tutorDescription='"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia."'
                                tutorYear="Seconde"
                                />
                                <TutorCard 
                                tutorName="Encore un"
                                tutorRole="Tutor"
                                tutorDescription='"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia."'
                                tutorYear="Seconde"
                                />
                            </div>

                            <div className="tutorOptionsRow">
                                <TutorCard
                                tutorName="ANother guy"
                                tutorRole="Administrator"
                                tutorDescription='"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia."'
                                tutorYear="Seconde"
                                />
                                <TutorCard
                                tutorName="Another dude"
                                tutorRole="Administrator"
                                tutorDescription='"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia."'
                                tutorYear="Seconde"
                                />
                                <TutorCard 
                                tutorName="Another man"
                                tutorRole="Tutor"
                                tutorDescription='"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia."'
                                tutorYear="Seconde"
                                />
                            </div>
                        </div>
                        <button>Right</button>
                    </div>
                    
                </div>
                <div className="pageSection" id="section1" style={{display: "none"}}>
                    <h1>Section 4</h1>
                </div>
                <button onClick={nextStep}>Next</button>
            </div>
        </div>
    </div>
}

export default Plans