import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

// interfata pentru structura datelor meteo
interface WeatherData {
  list: {
    weather: { icon: string; description: string }[];
    main: {
      temp_max: number;
      temp_min: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      feels_like: number;
    };
    clouds: { all: number };
    wind: { speed: number };
  }[];
}

// definim zilele saptamanii
const WEEK_DAYS: string[] = [
  "Luni",
  "Marți",
  "Miercuri",
  "Joi",
  "Vineri",
  "Sâmbătă",
  "Duminică",
];

// componenta care afiseaza prognoza meteo
const Forecast: React.FC<{ data: WeatherData }> = ({ data }) => {
  // determinam ziua curenta a saptamanii
  const dayInAWeek: number = new Date().getDay();
  // reordonam zilele saptamnaii incepand cu ziua curenta
  const forecastDays: string[] = WEEK_DAYS.slice(
    dayInAWeek,
    WEEK_DAYS.length
  ).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <>
      <label className="title">Zilnic</label>
      {/* acordeon pentru a afisa prognoza zilnica */}
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`/icons/${item.weather[0].icon}.png`}
                    className="icon-small"
                    alt="weather"
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_max)}°C /{" "}
                    {Math.round(item.main.temp_min)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {/* detaliile suplimentare pentru fiecare zi */}
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Presiune:</label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Umiditate:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Înnorat:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Viteza vântului:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Nivelul mării:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Se simte ca:</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
