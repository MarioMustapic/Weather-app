import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/card/Card.component";

function App() {
  interface stateData {
    time?: string[];
    [index: number | string]: number | string | any[] | any;
  }
  interface positionData {
    accuracy?: number;
    latitude: number;
    longitude: number;
  }
  const [weatherData, setWeatherData] = useState<stateData>();
  const [position, setPosition] = useState<positionData>();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos: any) {
      setPosition(() => ({
        ...pos.coords,
        accuracy: pos.coords.accuracy,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }));
      // console.log(pos.coords);
      // if (
      //   position?.latitude !== undefined &&
      //   position.longitude !== undefined
      // ) {
      //   console.log("Your current position is:");
      //   console.log(`Latitude : ${position?.latitude}`);
      //   console.log(`Longitude: ${position?.longitude}`);
      //   console.log(`More or less ${position?.accuracy} meters.`);
      // }
    }
    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [position?.latitude, position?.longitude, position?.accuracy]);

  useEffect(() => {
    if (position?.latitude !== undefined && position.longitude !== undefined)
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${position?.latitude}&longitude=${position?.longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,freezinglevel_height,weathercode,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,evapotranspiration,et0_fao_evapotranspiration,vapor_pressure_deficit,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm,shortwave_radiation,direct_radiation,diffuse_radiation,direct_normal_irradiance,terrestrial_radiation,shortwave_radiation_instant,direct_radiation_instant,diffuse_radiation_instant,direct_normal_irradiance_instant,terrestrial_radiation_instant,temperature_1000hPa,temperature_975hPa,temperature_950hPa,temperature_925hPa,temperature_900hPa,dewpoint_1000hPa,dewpoint_975hPa,dewpoint_950hPa,dewpoint_925hPa,dewpoint_900hPa,relativehumidity_1000hPa,relativehumidity_975hPa,relativehumidity_950hPa,relativehumidity_925hPa,relativehumidity_900hPa,cloudcover_1000hPa,cloudcover_975hPa,cloudcover_950hPa,cloudcover_925hPa,cloudcover_900hPa,windspeed_1000hPa,windspeed_975hPa,windspeed_950hPa,windspeed_925hPa,windspeed_900hPa,winddirection_1000hPa,winddirection_975hPa,winddirection_950hPa,winddirection_925hPa,winddirection_900hPa,geopotential_height_1000hPa,geopotential_height_975hPa,geopotential_height_950hPa,geopotential_height_925hPa,geopotential_height_900hPa&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=auto`
      )
        .then((response) => response.json())
        .then((data) =>
          setWeatherData(() => ({
            ...data,
            time: [
              new Date().toLocaleString(),
              new Date().getHours(),
              new Date().getTime(),
            ],
          }))
        );
  }, [position?.latitude, position?.longitude]);
  // weatherData ? console.log(weatherData) : console.log("2");
  return (
    <div className="App">
      <header className="App-header">
        <Card
          className={"currentWeather"}
          hourlyData={weatherData?.hourly}
          currentTime={weatherData?.time}
        />
        <Card
          className={"next24h"}
          hourlyData={weatherData?.hourly}
          currentTime={weatherData?.time}
        />
        <Card
          className={"next7d"}
          dailyData={weatherData?.daily}
          currentTime={weatherData?.time}
        />
      </header>
      <div>
        <a href="https://icons8.com" target="blank">
          icons by icons8{" "}
        </a>
      </div>
    </div>
  );
}

export default App;
