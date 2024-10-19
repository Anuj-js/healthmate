function getHealthCondition(symptoms) {
  let condition = "Unknown condition. Please consult a doctor.";
  
  if (symptoms.includes("fever") && symptoms.includes("headache")) {
    condition = "You might have the flu. It's recommended to consult a healthcare provider.";
  } else if (symptoms.includes("cough") && symptoms.includes("sore throat")) {
    condition = "You might have a cold. Drink fluids and rest.";
  }
  
  return condition;
}
