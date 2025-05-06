
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark-mode");
  }
  reset();
});

const sharedSymptoms = {
  "Bleeding": {
    question: "Where is the bleeding?",
    options: {
      "Abdomen": ["Internal Bleeding", "Lay flat, do not give food/water, evacuate immediately"],
      "Head": ["Head Wound", "Apply gentle pressure, monitor consciousness, avoid direct pressure on skull fractures"],
      "Limb": ["Limb Hemorrhage", "Apply pressure, elevate, use tourniquet if severe"]
    }
  },
  "Burns": {
    question: "What is the severity?",
    options: {
      "Blistering": ["Second-degree burn", "Cool burn, cover loosely, avoid breaking blisters"],
      "Charred or white areas": ["Third-degree burn", "Cover with sterile cloth, do not cool with water, evacuate"],
      "Red and painful": ["First-degree burn", "Cool with water, avoid creams, protect from sun"]
    }
  },
  "Chest Pain": {
    question: "Is the person conscious?",
    options: {
      "No": ["Cardiac Arrest", "Begin CPR immediately"],
      "Yes": ["Possible Heart Attack", "Keep calm, loosen clothes, evacuate"]
    }
  },
  "Coughing Blood": {
    question: "Has there been a recent injury?",
    options: {
      "No": ["Possible TB or Infection", "Wear mask, isolate, seek evacuation"],
      "Yes": ["Lung Trauma", "Sit upright, keep calm, evacuate"]
    }
  },
  "Fracture": {
    question: "Where is the fracture?",
    options: {
      "Arm": ["Arm Fracture", "Immobilize with splint, sling if needed"],
      "Leg": ["Leg Fracture", "Immobilize leg, avoid movement, use stretcher"],
      "Rib": ["Rib Fracture", "Wrap chest lightly, monitor for breathing issues"]
    }
  },
  "Gunshot Wound": {
    question: "Where is the wound?",
    options: {
      "Chest or Back": ["Thoracic Gunshot Wound", "Seal with airtight dressing, evacuate immediately"],
      "Limb": ["Limb Gunshot Wound", "Apply pressure, tourniquet if needed, immobilize"],
      "Abdomen": ["Abdominal Gunshot Wound", "Cover with sterile dressing, lay flat, evacuate"]
    }
  },
  "Headache": {
    question: "Is the headache severe and sudden?",
    options: {
      "No": ["Tension or Dehydration", "Hydrate, rest in shade, monitor"],
      "Yes": ["Possible Stroke or Aneurysm", "Keep calm, do not give food or drink, evacuate"]
    }
  },
  "Loss of Limb": {
    question: "Has bleeding been controlled?",
    options: {
      "No": ["Uncontrolled Amputation", "Apply tourniquet high on limb, pack with gauze, elevate"],
      "Yes": ["Post-Amputation", "Cover stump with sterile dressing, monitor for shock, evacuate"]
    }
  },
  "Severe Anxiety": {
    question: "Is the person responsive?",
    options: {
      "No or confused": ["Acute Stress Reaction", "Ensure safety, minimize stimulation, seek mental health support"],
      "Yes": ["Panic Attack", "Reassure, encourage slow breathing, remove from stressor"]
    }
  },
  "Shrapnel Injury": {
    question: "Is the object embedded?",
    options: {
      "No": ["Shrapnel Laceration", "Clean wound, apply pressure if bleeding, cover with sterile dressing"],
      "Yes": ["Embedded Shrapnel", "Do not remove object, stabilize in place, bandage and evacuate"]
    }
  },
  "Unconscious": {
    question: "Is the person breathing?",
    options: {
      "No": ["Cardiac Arrest", "Start CPR immediately"],
      "Yes": ["Concussion or Fainting", "Place in recovery position, monitor"]
    }
  },
  "Vomiting": {
    question: "Is there blood or black material in vomit?",
    options: {
      "No": ["Possible Infection or Motion Sickness", "Hydrate with clean fluids, rest"],
      "Yes": ["Gastrointestinal Bleed", "Lay on side, do not give anything orally, evacuate"]
    }
  }
};

function reset() {
  const container = document.getElementById('symptoms');
  const output = document.getElementById('diagnosis');
  container.innerHTML = '';
  output.innerHTML = '';
  const symptoms = Object.keys(sharedSymptoms).sort();
  symptoms.forEach(key => {
    const btn = document.createElement('button');
    btn.textContent = key;
    btn.onclick = () => showSecondStep(key);
    container.appendChild(btn);
  });
}








function showSecondStep(symptom) {
  const container = document.getElementById('symptoms');
  const output = document.getElementById('diagnosis');
  container.innerHTML = '';
  document.getElementById('select-symptom').style.display = 'none';
  output.innerHTML = `<strong>${sharedSymptoms[symptom].question}</strong><br><br>`;
  const options = sharedSymptoms[symptom].options;
  const sortedOptions = Object.keys(options).sort();
  sortedOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.style.display = "block";
    btn.style.width = "100%";
    btn.style.margin = "0.5rem 0";
    btn.style.padding = "1rem";
    btn.style.fontSize = "1rem";
    btn.onclick = () => {
      const [diag, aid] = options[opt];
      container.innerHTML = '';
      output.innerHTML = `<strong>${symptom} → ${opt}</strong><br><br><strong>Diagnosis:</strong> ${diag}<br><br><strong>First Aid:</strong> ${aid}<br><br><br>`;

      const aiSection = document.createElement('div');
      aiSection.innerHTML = `<strong>AI Integration</strong><br>`;
      if (localStorage.getItem("enableAI") === "true") {
        if (navigator.onLine) {
          aiSection.innerHTML += "<em>Querying AI...</em>";
          const prompt = `Show me the steps to address the following scenario: ${symptom} → ${opt}. Diagnosis: ${diag}. First Aid: ${aid}`;
          setTimeout(() => {
            aiSection.innerHTML = `<strong>AI Integration</strong><br><ul>
              <li>Identify scenario: ${symptom} → ${opt}</li>
              <li>Confirm diagnosis: ${diag}</li>
              <li>Apply first aid: ${aid}</li>
              <li>Evacuate if needed</li>
            </ul>`;
          }, 1000);
        } else {
          aiSection.innerHTML += "<em>No Internet</em>";
        }
        output.appendChild(aiSection);
      }

      const resetBtn = document.createElement('button');
      resetBtn.textContent = "Start Over";
      resetBtn.style.display = "block";
      resetBtn.style.width = "100%";
      resetBtn.style.margin = "0.5rem 0";
      resetBtn.style.padding = "1rem";
      resetBtn.style.fontSize = "1rem";
      resetBtn.onclick = () => {
        document.getElementById('select-symptom').style.display = 'block';
        reset();
      };
      output.appendChild(resetBtn);
    };
    output.appendChild(btn);
  });
}

