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

  function fetchWeather(q) {
    if (!q) return;
    setLoading(true);
    setError("");

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`)
      .then(res => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then(json => {
        const { lat, lon } = json.coord;
        fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
          .then(aqiRes => {
            if (!aqiRes.ok) throw new Error("Failed to fetch air quality");
            return aqiRes.json();
          })
          .then(aqiJson => {
            const airQuality = aqiJson.list[0].main.aqi;
            setData({ ...json, airQuality });
            setCity(q);
          })
          .catch(err => {
            setError(err.message);
            setData(null);
          })
          .finally(() => setLoading(false));
      })
      .catch(err => {
        setError(err.message);
        setData(null);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 flex flex-col items-center justify-center">
      {/* Title */}
      <div className="flex flex-col items-center mb-10 text-center w-full">
      <h1
    className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-3xl sm:text-4xl md:text-5xl font-extrabold
    text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 drop-shadow-lg"
  >
    <WiDaySunnyOvercast className="text-4xl sm:text-5xl md:text-6xl text-yellow-400 animate-pulse" />
    <span className="flex items-center">
      Fore<span className="text-white ml-1">Castly</span>
    </span>
  </h1>
</div>
  {/* Search */}
  <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mt-6 px-2">
    <SearchBar onSearch={(q) => fetchWeather(q)} />
  </div>

      {loading && <Loader />}
      {error && <div className="mt-4 text-red-400 text-center">{error}</div>}

      {data && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-10 w-full">
          {/* Left: Weather Card */}
          <div className="md:col-span-2 lg:col-span-2 w-full">
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
