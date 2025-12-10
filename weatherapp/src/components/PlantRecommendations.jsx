import React from "react";
import { plantRecommendations } from "../data/plants";
import { WiRain, WiDaySunny, WiSnow, WiCloudy, WiThermometer } from "react-icons/wi";

export default function PlantRecommendations({ desc }) {
  const type = desc.includes("rain")
    ? "rainy"
    : desc.includes("cloud")
    ? "humid"
    : desc.includes("clear")
    ? "hot"
    : desc.includes("snow")
    ? "cold"
    : "dry";

  const list = plantRecommendations[type] || [];

  const icon =
    type === "rainy" ? <WiRain size={40} /> :
    type === "humid" ? <WiCloudy size={40} /> :
    type === "hot" ? <WiDaySunny size={40} /> :
    type === "cold" ? <WiSnow size={40} /> :
    <WiThermometer size={40} />;

  return (
    <div className="bg-green-900/20 mt-5 p-6 rounded-2xl text-center border border-green-500/40 shadow-lg">

      {/* Header */}
      <div className="flex justify-center items-center gap-3 mb-5">
        {icon}
        <h2 className="text-2xl font-bold text-green-300">
          Best Plants for this Climate
        </h2>
      </div>

      {/* 🌿 Horizontal plant list */}
      <div className="flex flex-wrap justify-center gap-3">
        {list.length > 0 ? (
          list.map((plant, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-green-700/30 border border-green-500/40 rounded-full text-white text-md"
            >
              {plant}
            </span>
          ))
        ) : (
          <p className="text-gray-100 text-lg">
            No recommendations available.
          </p>
        )}
      </div>

    </div>
  );
}
