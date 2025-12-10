import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Loader from "../components/Loader";
import Suggestions from "../components/Suggestions";
import PlantRecommendations from "../components/PlantRecommendations";
import Predictions from "../components/Predictions";
import { WiDaySunnyOvercast } from "react-icons/wi";

const API_KEY = import.meta.env.VITE_OWM_API_KEY;

export default function TempHome() {
  const [city, setCity] = useState("Delhi");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchWeather(q) {
    if (!q) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) throw new Error("City not found");

      const json = await res.json();
      const { lat, lon } = json.coord;

      const aqiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      if (!aqiRes.ok) throw new Error("Failed to fetch air quality");

      const aqiJson = await aqiRes.json();
      const airQuality = aqiJson.list[0].main.aqi;

      setData({ ...json, airQuality });
      setCity(q);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 mb-10">
      {/* Title */}
      <div className="flex flex-col items-center mb-10 text-center">
        <h1
          className="text-4xl font-extrabold flex items-center gap-3
          text-transparent bg-clip-text bg-gradient-to-r
          from-teal-400 via-blue-400 to-indigo-500 drop-shadow-lg"
        >
          <WiDaySunnyOvercast className="text-5xl text-yellow-400 animate-pulse" />
          Climate<span className="text-white">App</span>
        </h1>

        {/* Search */}
        <div className="w-full max-w-xl mt-6">
          <SearchBar onSearch={(q) => fetchWeather(q)} />
        </div>
      </div>

      {loading && <Loader />}
      {error && <div className="mt-4 text-red-400 text-center">{error}</div>}

      {data && !loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
          {/* Left: Weather Card */}
          <div className="lg:col-span-2">
            <WeatherCard data={data} />
          </div>

          {/* Right: Suggestions/Plants/Predictions */}
          <div className="flex flex-col gap-6">
            <Suggestions desc={data.weather[0].description} />
            <PlantRecommendations desc={data.weather[0].description} />
            <Predictions data={data} />
          </div>
        </div>
      )}
    </div>
  );
}
