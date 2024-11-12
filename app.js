// app.js

const diseaseData = {
    fever: {
        name: "Fever",
        questions: [
            { question: "Do you have a temperature above 100°F (37.8°C)?", options: ["Yes", "No"] },
            { question: "Are you experiencing chills?", options: ["Yes", "No"] },
            { question: "Do you feel fatigued or weak?", options: ["Yes", "No"] }
        ],
        severity: "common",
        treatment: "Over-the-counter fever medicine (e.g., Paracetamol, Ibuprofen), Hydration, Rest"
    },
    flu: {
        name: "Flu",
        questions: [
            { question: "Do you have a high fever?", options: ["Yes", "No"] },
            { question: "Do you have body aches?", options: ["Yes", "No"] },
            { question: "Do you have a cough?", options: ["Yes", "No"] }
        ],
        severity: "common",
        treatment: "Rest, Hydration, Paracetamol (for fever), Ibuprofen (for body aches)"
    },
    cold: {
        name: "Cold",
        questions: [
            { question: "Do you have a runny nose?", options: ["Yes", "No"] },
            { question: "Do you have a sore throat?", options: ["Yes", "No"] },
            { question: "Do you have a mild cough?", options: ["Yes", "No"] }
        ],
        severity: "common",
        treatment: "Over-the-counter cold medicine (e.g., decongestants, throat lozenges), Rest"
    },
    covid: {
        name: "COVID-19",
        questions: [
            { question: "Have you lost your sense of smell or taste?", options: ["Yes", "No"] },
            { question: "Do you have difficulty breathing?", options: ["Yes", "No"] },
            { question: "Do you have a dry cough?", options: ["Yes", "No"] }
        ],
        severity: "urgent", // changed to urgent for alert to work
        treatment: "Seek medical advice immediately, rest, stay hydrated, and take fever medicine if needed."
    },
    bacterial: {
        name: "Bacterial Infection",
        questions: [
            { question: "Do you have a high fever?", options: ["Yes", "No"] },
            { question: "Do you have swelling in any part of your body?", options: ["Yes", "No"] },
            { question: "Do you have pus or discharge from any wound?", options: ["Yes", "No"] }
        ],
        severity: "urgent", // changed to urgent for alert to work
        treatment: "Seek medical advice immediately for antibiotics. Avoid self-medicating."
    },
    staining: {
        name: "Staining Disease",
        questions: [
            { question: "Do you have skin discoloration?", options: ["Yes", "No"] },
            { question: "Do you have rashes?", options: ["Yes", "No"] },
            { question: "Is there pain with the skin condition?", options: ["Yes", "No"] }
        ],
        severity: "urgent",
        treatment: "Consult a doctor urgently for accurate diagnosis and treatment."
    },
    asthma: {
        name: "Asthma",
        questions: [
            { question: "Do you have difficulty breathing?", options: ["Yes", "No"] },
            { question: "Do you have wheezing or a tight chest?", options: ["Yes", "No"] },
            { question: "Do you experience shortness of breath after physical activity?", options: ["Yes", "No"] }
        ],
        severity: "urgent", // changed to urgent for alert to work
        treatment: "Use inhalers as prescribed, avoid asthma triggers, and consult your doctor for further treatment."
    },
    diabetes: {
        name: "Diabetes",
        questions: [
            { question: "Do you often feel thirsty?", options: ["Yes", "No"] },
            { question: "Do you urinate more frequently than usual?", options: ["Yes", "No"] },
            { question: "Do you feel fatigued or weak?", options: ["Yes", "No"] }
        ],
        severity: "common",
        treatment: "Monitor blood sugar levels, follow a proper diet plan, and consult your doctor."
    },
    allergy: {
        name: "Allergy",
        questions: [
            { question: "Do you have sneezing, runny nose, or itchy eyes?", options: ["Yes", "No"] },
            { question: "Do you experience skin rashes or hives?", options: ["Yes", "No"] },
            { question: "Do you have difficulty breathing?", options: ["Yes", "No"] }
        ],
        severity: "urgent", // changed to urgent for alert to work
        treatment: "Take antihistamines, avoid allergens, and consult your doctor for further advice."
    },
    malaria: {
        name: "Malaria",
        questions: [
            { question: "Have you traveled to a region with malaria?", options: ["Yes", "No"] },
            { question: "Do you have chills and fever?", options: ["Yes", "No"] },
            { question: "Do you experience extreme fatigue and sweating?", options: ["Yes", "No"] }
        ],
        severity: "urgent",
        treatment: "Seek immediate medical advice for antimalarial treatment. Malaria can be life-threatening if untreated."
    }
};

let selectedDisease = null;
let currentQuestionIndex = 0;
let userAnswers = [];

function selectDisease() {
    const disease = document.getElementById('disease-category').value;
    if (!disease) {
        return;
    }
    selectedDisease = diseaseData[disease];
    userAnswers = [];
    currentQuestionIndex = 0;
    showQuestion(selectedDisease);
}

function showQuestion(disease) {
    const questionForm = document.getElementById("question-form");
    questionForm.innerHTML = ''; // Clear previous questions

    if (currentQuestionIndex < disease.questions.length) {
        const currentQuestion = disease.questions[currentQuestionIndex];
        const label = document.createElement('label');
        label.innerText = currentQuestion.question;

        const select = document.createElement('select');
        select.id = `q${currentQuestionIndex}`;
        currentQuestion.options.forEach(option => {
            const optionElem = document.createElement('option');
            optionElem.value = option;
            optionElem.innerText = option;
            select.appendChild(optionElem);
        });

        const div = document.createElement('div');
        div.appendChild(label);
        div.appendChild(select);
        questionForm.appendChild(div);

        document.getElementById("question-section").style.display = "block"; // Show the question section

        // Update progress bar
        const progress = (currentQuestionIndex + 1) / disease.questions.length * 100;
        document.getElementById("progress").style.width = progress + "%";
    }
}

function submitAnswer() {
    const answer = document.getElementById(`q${currentQuestionIndex}`).value;
    userAnswers.push(answer);

    if (currentQuestionIndex + 1 < selectedDisease.questions.length) {
        currentQuestionIndex++;
        showQuestion(selectedDisease);
    } else {
        evaluateDiagnosis();
    }
}

function goBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(selectedDisease);
    }
}

function evaluateDiagnosis() {
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block"; // Show result div

    let resultText = `${selectedDisease.name} Diagnosis: `;

    // Check if the disease is urgent
    if (selectedDisease.severity === "urgent") {
        // Display an alert for urgent diseases
        alert(`This appears to be a serious condition. Please consult a doctor immediately!`);
        resultText += "This is a serious condition. You should seek medical consultation immediately!";
    } else {
        resultText += `For treatment, try the following: ${selectedDisease.treatment}`;
    }

    resultDiv.innerHTML = resultText;
}

