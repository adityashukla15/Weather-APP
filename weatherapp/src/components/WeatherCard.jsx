import React from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiDayFog,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import { motion } from "framer-motion"; // 👈 import here

export default function WeatherCard({ data }) {
  const { name, sys, main, weather, wind,airQuality} = data;
  const desc = weather?.[0]?.description?.toLowerCase() || "";

  const getWeatherIcon = () => {
    if (desc.includes("cloud")) return <WiCloudy className="text-6xl text-blue-300" />;
    if (desc.includes("rain")) return <WiRain className="text-6xl text-blue-400" />;
    if (desc.includes("clear")) return <WiDaySunny className="text-6xl text-yellow-400" />;
    if (desc.includes("mist") || desc.includes("fog") || desc.includes("haze"))
      return <WiDayFog className="text-6xl text-gray-300" />;
    if (desc.includes("snow")) return <WiSnow className="text-6xl text-blue-200" />;
    if (desc.includes("thunder")) return <WiThunderstorm className="text-6xl text-purple-400" />;
    return <WiDaySunny className="text-6xl text-yellow-400" />;
  };
const aqiLabel = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };
  return (
    // 👇 your animated card container
    <motion.div
      className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl w-full max-w-md border border-white/20 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="text-2xl font-semibold mb-2">
        {name}, {sys.country}
      </h2>

      <div className="flex justify-center items-center mb-3 animate-pulse">
        {getWeatherIcon()}
      </div>

      <div className="text-5xl font-bold mb-1">{Math.round(main.temp)}°C</div>
      <p className="text-gray-300 mb-4 capitalize">{desc}</p>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-white">Min</p>
          <p>{main.temp_min}°C</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-white">Max</p>
          <p>{main.temp_max}°C</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-white">Humidity</p>
          <p>{main.humidity}%</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-white">Wind</p>
          <p>{wind.speed} m/s</p>
        </div>
      </div>
       <div className=" m-8 p-4 bg-gray-800 rounded-lg text-white space-y-2">

      <div className="bg-white/5 rounded-lg p-2">
        <p>Air Quality</p>
        <p>{aqiLabel[airQuality]}</p>
      </div>
    </div>
    </motion.div>
  );
}
