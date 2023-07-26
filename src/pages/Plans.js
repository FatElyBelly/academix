// Styles
import '../styles/PlansPage.css'

// State
import { useState } from 'react'

// Components
import PlanOption from '../components/PlanOption.js'

const Plans = () => {

    let [currentStep, setCurrentStep] = useState(1)
    const nextStep = (step) => {
        // Increase step
        if (currentStep<6){
            if (step==="back" && currentStep>1) {
                let steps = document.getElementsByClassName("eachStep")
                steps[currentStep-2].style.opacity = "0.7"
                setCurrentStep(currentStep-1)
            } else if (step==="forward") {
                setCurrentStep(currentStep+1)
                let steps = document.getElementsByClassName("eachStep")
                for (let i=0; i<currentStep; i++) {
                    steps[i].style.opacity = "1"
                }
            }
    
            // Animate progress bar
            let currentProgressLineWidth = document.getElementById("progressLine").style.width.replace('%', '')
            let progressLineWidth = Number(currentProgressLineWidth)
            if (step==="back" && currentStep>1) {
                progressLineWidth -= 25
            } else if (step==="forward") {
                progressLineWidth += 25
            }
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
                <h1 className="eachStep">2. Tuteur</h1>
                <h1 className="eachStep">3. Planning</h1>
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
                        <PlanOption name="Basic" price="4.99" addition="Package includes:" featureList={["Videos", "Support par chat"]} variation="default"></PlanOption>
                        <PlanOption name="Premium" price="49.99" addition="In addition to all features in Basic and Plus, also includes:" featureList={["Tutoring", "Contact", "Etc etc"]} variation="special"></PlanOption>
                        <PlanOption name="Plus" price="19.99" addition="In addition to all features in Basic, also includes:" featureList={["Etc etc", "Etc etc", "Etc etc"]} variation="default"></PlanOption>
                    </div>
                </div>
                <div className="pageSection" id="section2" style={{display: "none"}}>
                    <h1>Section 1</h1>
                </div>
                <div className="pageSection" id="section3" style={{display: "none"}}>
                    <h1>Section 1</h1>
                </div>
                <div className="pageSection" id="section4" style={{display: "none"}}>
                    <h1>Paiement</h1>
                </div>
                <button onClick={()=>{nextStep("back")}}>Back</button>
                <button onClick={()=>{nextStep("forward")}}>Next</button>
            </div>
        </div>
    </div>
}

export default Plans