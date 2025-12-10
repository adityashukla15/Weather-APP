import React from "react";
import { locationSuggestions } from "../data/locations";
import { WiRain, WiDaySunny, WiSnow, WiCloudy, WiFog } from "react-icons/wi";

export default function Suggestions({ desc }) {
  const d = desc.toLowerCase();

  const type = d.includes("rain")
    ? "rainy"
    : d.includes("cloud")
    ? "humid"
    : d.includes("clear")
    ? "hot"
    : d.includes("snow")
    ? "cold"
    : d.includes("mist") || d.includes("haze") || d.includes("fog")
    ? "humid"
    : "dry";

  const list = locationSuggestions[type] || [];

  // Choose icon based on climate
  const icon = type === "rainy" ? <WiRain size={40} /> :
               type === "humid" ? <WiCloudy size={40} /> :
               type === "hot" ? <WiDaySunny size={40} /> :
               type === "cold" ? <WiSnow size={40} /> :
               <WiFog size={40} />;

  return (
    <div className="bg-blue-900/20 mt-5 p-6 rounded-2xl text-center border border-blue-500/40 shadow-lg">
      <div className="flex justify-center items-center gap-3 mb-3">
        {icon}
        <h2 className="text-2xl font-bold text-blue-300">
          Explore Ideal Spots 🌎
        </h2>
      </div>
      <p className="text-gray-100 text-lg">
        {list.length > 0 ? list.join(", ") : "No locations found."}
      </p>
    </div>
  );
}
