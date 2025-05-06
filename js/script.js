
const symptoms = {
    "Bleeding": {
        question: "Where is the bleeding?",
        options: {
            "Abdomen": { diagnosis: "Internal Bleeding", aid: "Lay flat, do not give food/water, evacuate immediately" },
            "Head": { diagnosis: "Head Wound", aid: "Apply gentle pressure, monitor consciousness, avoid direct pressure on skull fractures" },
            "Limb": { diagnosis: "Limb Hemorrhage", aid: "Apply pressure, elevate, use tourniquet if severe" }
        }
    },
    "Burns": {
        question: "What is the severity?",
        options: {
            "Blistering": { diagnosis: "Second-degree burn", aid: "Cool burn, cover loosely, avoid breaking blisters" },
            "Charred or white areas": { diagnosis: "Third-degree burn", aid: "Cover with sterile cloth, do not cool with water, evacuate" },
            "Red and painful": { diagnosis: "First-degree burn", aid: "Cool with water, avoid creams, protect from sun" }
        }
    },
    "Chest Pain": {
        question: "Is the person conscious?",
        options: {
            "No": { diagnosis: "Cardiac Arrest", aid: "Begin CPR immediately" },
            "Yes": { diagnosis: "Possible Heart Attack", aid: "Keep calm, loosen clothes, evacuate" }
        }
    },
    "Coughing Blood": {
        question: "Has there been a recent injury?",
        options: {
            "No": { diagnosis: "Possible TB or Infection", aid: "Wear mask, isolate, seek evacuation" },
            "Yes": { diagnosis: "Lung Trauma", aid: "Sit upright, keep calm, evacuate" }
        }
    },
    "Fracture": {
        question: "Where is the fracture?",
        options: {
            "Arm": { diagnosis: "Arm Fracture", aid: "Immobilize with splint, sling if needed" },
            "Leg": { diagnosis: "Leg Fracture", aid: "Immobilize leg, avoid movement, use stretcher" },
            "Rib": { diagnosis: "Rib Fracture", aid: "Wrap chest lightly, monitor for breathing issues" }
        }
    },
    "Gunshot Wound": {
        question: "Where is the wound?",
        options: {
            "Chest or Back": { diagnosis: "Thoracic Gunshot Wound", aid: "Seal with airtight dressing, evacuate immediately" },
            "Limb": { diagnosis: "Limb Gunshot Wound", aid: "Apply pressure, tourniquet if needed, immobilize" },
            "Abdomen": { diagnosis: "Abdominal Gunshot Wound", aid: "Cover with sterile dressing, lay flat, evacuate" }
        }
    },
    "Headache": {
        question: "Is the headache severe and sudden?",
        options: {
            "No": { diagnosis: "Tension or Dehydration", aid: "Hydrate, rest in shade, monitor" },
            "Yes": { diagnosis: "Possible Stroke or Aneurysm", aid: "Keep calm, do not give food or drink, evacuate" }
        }
    },
    "Loss of Limb": {
        question: "Has bleeding been controlled?",
        options: {
            "No": { diagnosis: "Uncontrolled Amputation", aid: "Apply tourniquet high on limb, pack with gauze, elevate" },
            "Yes": { diagnosis: "Post-Amputation", aid: "Cover stump with sterile dressing, monitor for shock, evacuate" }
        }
    },
    "Severe Anxiety": {
        question: "Is the person responsive?",
        options: {
            "No or confused": { diagnosis: "Acute Stress Reaction", aid: "Ensure safety, minimize stimulation, seek mental health support" },
            "Yes": { diagnosis: "Panic Attack", aid: "Reassure, encourage slow breathing, remove from stressor" }
        }
    },
    "Shrapnel Injury": {
        question: "Is the object embedded?",
        options: {
            "No": { diagnosis: "Shrapnel Laceration", aid: "Clean wound, apply pressure if bleeding, cover with sterile dressing" },
            "Yes": { diagnosis: "Embedded Shrapnel", aid: "Do not remove object, stabilize in place, bandage and evacuate" }
        }
    },
    "Unconscious": {
        question: "Is the person breathing?",
        options: {
            "No": { diagnosis: "Cardiac Arrest", aid: "Start CPR immediately" },
            "Yes": { diagnosis: "Concussion or Fainting", aid: "Place in recovery position, monitor" }
        }
    },
    "Vomiting": {
        question: "Is there blood or black material in vomit?",
        options: {
            "No": { diagnosis: "Possible Infection or Motion Sickness", aid: "Hydrate with clean fluids, rest" },
            "Yes": { diagnosis: "Gastrointestinal Bleed", aid: "Lay on side, do not give anything orally, evacuate" }
        }
    }
};

const container = document.getElementById('symptoms');
const output = document.getElementById('diagnosis');
let selectedSymptom = "";

function reset() {
    container.innerHTML = '';
    output.innerHTML = '';
    selectedSymptom = '';
    showSymptoms();
}

function showSymptoms() {
    const sortedSymptoms = Object.keys(symptoms).sort();
    sortedSymptoms.forEach(symptom => {
        const btn = document.createElement('button');
        btn.textContent = symptom;
        btn.onclick = () => {
            selectedSymptom = symptom;
            showSecondStep(symptom);
        };
        container.appendChild(btn);
    });
}

function showSecondStep(symptom) {
    container.innerHTML = '';
    output.innerHTML = `<strong>${symptoms[symptom].question}</strong>`;
    const options = symptoms[symptom].options;
    const sortedOptions = Object.keys(options).sort();
    sortedOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => {
            const { diagnosis, aid } = options[opt];
            container.innerHTML = '';
            output.innerHTML = `<strong>Diagnosis:</strong> ${diagnosis}<br><strong>First Aid:</strong> ${aid}`;
            const resetBtn = document.createElement('button');
            resetBtn.textContent = "Start Over";
            resetBtn.onclick = reset;
            container.appendChild(resetBtn);
        };
        container.appendChild(btn);
    });
}

reset();
