import React from "react";
import { predictWaterLevel, predictWindFlow } from "../data/predictionRules";

export default function Predictions({ data }) {
  const rain = data.rain?.["1h"] || 0;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;

  return (
    <div className="bg-white/10 mt-5 p-4 rounded-xl border border-white/20">
      <h2 className="text-xl font-semibold text-purple-300 text-center mb-3">
        Climate Predictions 🔮
      </h2>

      <p className="text-gray-200 mb-2">
        🌊 Water Level: {predictWaterLevel(rain, humidity)}
      </p>

      <p className="text-gray-200">
        💨 Wind Flow: {predictWindFlow(wind)}
      </p>
    </div>
  );
}
