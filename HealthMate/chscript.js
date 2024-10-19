const medicineData = [
    { name: 'Paracetamol', price: 50, shop: 'Pharmacy One', address: '123 Main St' },
    { name: 'Paracetamol', price: 45, shop: 'Healthy Life Pharmacy', address: '456 Greenway Blvd' },
    { name: 'Ibuprofen', price: 70, shop: 'Pharmacy Two', address: '789 Sunset Ave' },
    { name: 'Ibuprofen', price: 65, shop: 'MediCare Pharmacy', address: '101 Maple St' }
];

// Simulated available appointment slots
const appointmentSlots = [ 
    "10:00 AM - 10:30 AM",
    "11:00 AM - 11:30 AM",
    "2:00 PM - 2:30 PM",
    "4:00 PM - 4:30 PM"
];

// Simulated doctor information
const doctors = [
    { name: "Dr. Smith", specialization: "General Physician", address: "789 Health St", fees: 500 },
    { name: "Dr. Jones", specialization: "Pediatrician", address: "456 Care Rd", fees: 700 },
    { name: "Dr. Taylor", specialization: "Cardiologist", address: "123 Wellness Ave", fees: 1200 }
];

// Simulated nearby doctors based on location (mocked for simplicity)
const nearbyDoctors = [
    { name: "Dr. Adams", specialization: "General Physician", address: "111 Care Lane", fees: 450 },
    { name: "Dr. Baker", specialization: "Dermatologist", address: "222 Healing Rd", fees: 650 },
    { name: "Dr. Clark", specialization: "Orthopedist", address: "333 Recovery Blvd", fees: 800 }
];

// Function to send user input to the chat
function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    // Display the user's message
    displayMessage(userInput, 'user-message');

    // Get the bot's response based on user input
    const botResponse = getBotResponse(userInput);
    displayMessage(botResponse, 'bot-message');

    // Clear the input field
    document.getElementById('user-input').value = '';
}

// Function to display a message in the chatbox
function displayMessage(message, className) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + className;
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Function to handle Enter key press for sending messages
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Function to find the lowest price of a given medicine
function findLowestPrice(medicineName) {
    const results = medicineData.filter(item => item.name.toLowerCase() === medicineName.toLowerCase());

    if (results.length === 0) {
        return "Sorry, I couldn't find that medicine.";
    }

    // Sort by price to find the lowest
    results.sort((a, b) => a.price - b.price);
    const lowestPriceItem = results[0];

    return `The lowest price for ${medicineName} is ₹${lowestPriceItem.price} at ${lowestPriceItem.shop}, located at ${lowestPriceItem.address}.`;
}

// Function to display available appointment slots
function getAvailableAppointments() {
    return "Here are the available appointment slots:\n" + appointmentSlots.join('\n');
}

// Function to simulate booking an appointment
function bookAppointment(slot) {
    if (appointmentSlots.includes(slot)) {
        return `Your appointment has been successfully booked for ${slot}.`;
    } else {
        return `Sorry, that slot is not available. Please choose another one.`;
    }
}

// Function to provide emergency assistance
function getEmergencyAssistance() {
    return "If you're facing an emergency, please dial 112 for immediate assistance, or visit the nearest hospital.";
}

// Function to provide symptom-based suggestions
function checkSymptoms(symptom) {
    symptom = symptom.toLowerCase();

    const symptomResponse = {
        "headache": "For headaches, rest in a quiet environment and stay hydrated. If it persists, consult a doctor.",
        "fever": "For fever, take plenty of rest and fluids. If the fever exceeds 101°F, consult a doctor."
    };

    return symptomResponse[symptom] || "I'm not sure about that symptom. Please consult a healthcare professional.";
}

// Function to suggest a doctor based on the symptom
function suggestDoctor() {
    const doctor = doctors[0]; // Suggest the first doctor for simplicity
    return `It seems you have a fever. I suggest you visit ${doctor.name}, a ${doctor.specialization} at ${doctor.address}. Would you like to book an appointment?`;
}

// Function to find nearby doctors
function findNearbyDoctors() {
    return nearbyDoctors.map(doc => `${doc.name}, a ${doc.specialization}, located at ${doc.address}, with fees of ₹${doc.fees}.`).join('\n');
}

// Function to compare doctor fees
function compareDoctorFees() {
    const feeComparison = doctors.map(doc => `${doc.name} charges ₹${doc.fees}`).join('\n');
    return `Here is the fee comparison of doctors:\n${feeComparison}`;
}

// Function to generate bot responses
function getBotResponse(input) {
    input = input.toLowerCase();

    // Check for price comparison requests
    if (input.includes("price of")) {
        const medicineName = input.split("price of ")[1].trim();
        return findLowestPrice(medicineName);
    }
    // Check for symptom queries
    else if (input.includes("symptom")) {
        const symptom = input.split("symptom ")[1].trim();
        return checkSymptoms(symptom);
    }
    // Suggest doctor for fever
    else if (input.includes("fever")) {
        return suggestDoctor();
    }
    // Appointment booking feature
    else if (input.includes("appointment")) {
        if (input.includes("book")) {
            const slot = input.split("book appointment at ")[1].trim();
            return bookAppointment(slot);
        } else {
            return getAvailableAppointments();
        }
    }
    // Emergency assistance feature
    else if (input.includes("emergency")) {
        return getEmergencyAssistance();
    }
    // Nearby doctors feature
    else if (input.includes("nearby doctors")) {
        return findNearbyDoctors();
    }
    // Doctor fee comparison feature
    else if (input.includes("compare fees")) {
        return compareDoctorFees();
    }
    // Health tips or general queries
    else if (input.includes("diet")) {
        return "For a balanced diet, include fresh fruits, vegetables, whole grains, and lean proteins. Drink plenty of water.";
    }
    else if (input.includes("exercise")) {
        return "Regular exercise, such as walking, jogging, or yoga, can help improve your overall health. Aim for at least 30 minutes a day.";
    }
    // If no recognized command is found
    else {
        return "Sorry, I didn't understand that. Could you try rephrasing?";
    }
}