import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../Images/searchIcon.png";
import Sunny from "../Images/sunny.png";
import Wind from "../Images/wind.png";
import Humidity from "../Images/Humidity.png";
import ClearIcon from "../Images/clear-icon.png";
import RainIcon from "../Images/rain-icon.png";
import SnowIcon from "../Images/snow-icon.png";
import Thunderstorm from "../Images/thunderstorm.png";
import ShowerRain from "../Images/shower-rain.png";
import CloudIcon from "../Images/cloud-icon.png";

const API_KEY = "e959d49e6dc35db0e87b45b5e7b012d3";

function Weatherapp() {
  const inputRef = useRef();
  const [weather, setWeather] = useState({
    humidity: "--",
    wind: "--",
    temperature: "--",
    location: "Loading...",
    icon: Sunny,
  });

  const AllIcons = {
    "01d": Sunny,
    "02d": ClearIcon,
    "03d": CloudIcon,
    "09d": ShowerRain,
    "10d": RainIcon,
    "11d": Thunderstorm,
    "13d": SnowIcon,
  };

  const Search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return;
    }
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(URL);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const Icon = AllIcons[data.weather[0].icon] || Sunny;
      setWeather({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: Icon,
      });
    } catch (error) {
      setWeather(false);
      console.error("Error fetching the data");
    }
  };

  useEffect(() => {
    Search("");
  }, []);

  return (
    <div>
      <h2>Weather App</h2>
      <div className="container">
        <div className="search-bar">
          <input ref={inputRef} type="text" placeholder="Search..." />
          <img
            src={SearchIcon}
            onClick={() => Search(inputRef.current.value)}
            alt="search"
          />
        </div>
        {weather ? (
          <>
            <div className="Sunny">
              <img src={weather.icon} alt="sunny" />
              <p className="degrees">{weather.temperature} &deg;C</p>
              <p className="location">{weather.location}</p>
            </div>
            <div className="mainSection">
              <div className="section1">
                <div className="Humidity">
                  <img src={Humidity} alt="Humidity" />
                </div>
                <div className="Humidity">
                  <p className="persantage">{weather.humidity}%</p>
                  <p className="Humi">Humidity</p>
                </div>
              </div>
              <div className="section2">
                <div className="wind">
                  <img src={Wind} alt="wind" />
                </div>
                <div className="wind">
                  <p className="kilo">{weather.wind}km/h</p>
                  <p className="speed">Wind speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Weatherapp;
