import React, { useState, useRef } from "react";
import Search from "../components/search/search";
import CurrentWeather from "../components/current-weather/current-weather";
import Forecast from "../components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";
import "../styles/Vremea.css";

import audioSunny from "/sounds/birds.mp3";
import audioRainy from "/sounds/rain.mp3";
import audioFoggy from "/sounds/foggy.mp3";
import audioNight from "/sounds/night.mp3";
import audioSnow from "/sounds/snow.mp3";
import audioStorm from "/sounds/storm.mp3";
import audioWRain from "/sounds/window_rain.mp3";

const Vremea: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>("");
  const [mute, setMute] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleBackgroundChange = (imageUrl: string) => {
    setBackgroundImageUrl(imageUrl);

    // alegere audio dupa imagine
    let newBackgroundAudio = "";
    switch (imageUrl) {
      case "/weather/01d.jpg":
      case "/weather/02d.jpg":
      case "/weather/03d.jpg":
        newBackgroundAudio = audioSunny;
        break;
      case "/weather/01n.jpg":
      case "/weather/02n.jpg":
      case "/weather/03n.jpg":
      case "/weather/04n.jpg":
        newBackgroundAudio = audioNight;
        break;
      case "/weather/04d.jpg":
      case "/weather/50d.jpg":
      case "/weather/50n.jpg":
        newBackgroundAudio = audioFoggy;
        break;
      case "/weather/09d.jpg":
      case "/weather/09n.jpg":
        newBackgroundAudio = audioRainy;
        break;
      case "/weather/10d.jpg":
      case "/weather/10n.jpg":
        newBackgroundAudio = audioWRain;
        break;
      case "/weather/11d.jpg":
      case "/weather/11n.jpg":
        newBackgroundAudio = audioStorm;
        break;
      case "/weather/13d.jpg":
      case "/weather/13n.jpg":
        newBackgroundAudio = audioSnow;
        break;
      default:
        break;
    }

    if (!mute && audioRef.current) {
      audioRef.current.src = newBackgroundAudio;
      audioRef.current.play();
    }
  };

  const toggleMute = () => {
    setMute((prevMute) => !prevMute);

    if (audioRef.current) {
      if (!mute) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleOnSearchChange = (searchData: any) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

        handleBackgroundChange(
          `/weather/${weatherResponse.weather[0].icon}.jpg`
        );
      })
      .catch(console.log);
  };

  return (
    <main className="bodyVreme">
      <div
        className="containerVremea"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <Search onSearchChange={handleOnSearchChange} />
        <div className="center-contentVremea">
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast && <Forecast data={forecast} />}
          {currentWeather && forecast && (
            <button onClick={toggleMute} className="butonSunet">
              {mute ? "Activează sunet" : "Dezactivează sunet"}
            </button>
          )}
          {!currentWeather && !forecast && (
            <div className="placeholderContent">
              <div className="card-container">
                <div className="card">
                  <img
                    src="https://i.pinimg.com/564x/8a/7d/d9/8a7dd955a31be6f640157bc6a9ab8d43.jpg"
                    alt="London"
                    className="card-image"
                  />
                  <p className="card-caption">București</p>
                </div>

                <div className="card">
                  <img
                    src="https://i.pinimg.com/564x/31/1d/cf/311dcff867fd9d401208c4bbd084ae84.jpg"
                    alt="Los Angeles"
                    className="card-image"
                  />
                  <p className="card-caption">Timișoara</p>
                </div>

                <div className="card">
                  <img
                    src="https://i.pinimg.com/564x/56/2a/fd/562afd94bf5493e1749c7bd46b4fdfcd.jpg"
                    alt="Venice"
                    className="card-image"
                  />
                  <p className="card-caption">Constanța</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <audio ref={audioRef} autoPlay loop />
      </div>
    </main>
  );
};

export default Vremea;
