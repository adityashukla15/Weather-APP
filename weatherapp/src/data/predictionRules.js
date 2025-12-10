// 💧 Prediction of Water Level
export function predictWaterLevel(rain, humidity) {
  if (rain > 20) return "High water level expected — heavy rainfall detected";
  if (rain > 5) return "Moderate water level — stay alert";
  if (humidity > 85) return "Low chance of rainwater rise, but humidity is high";
  return "No significant water level rise expected";
}

// 🌬 Prediction of Wind Flow
export function predictWindFlow(speed) {
  if (speed > 20) return "Strong wind — possible storms";
  if (speed > 10) return "Moderate wind — noticeable breeze";
  if (speed > 5) return "Light wind — normal conditions";
  return "Calm and stable atmosphere";
}
