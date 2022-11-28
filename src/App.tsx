import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/card/Card.component";
import { Location } from "./components/location/Location.component";
import { SelectAPI } from "./components/selectAPI/SelectAPI.component";

function App() {
  interface stateData {
    time?: string[];
    [index: number | string]: number | string | any[] | any;
  }
  interface API {
    URL: string;
    title: string;
  }
  // interface locationData {
  //   accuracy?: number;
  //   latitude: number;
  //   longitude: number;
  // }
  const [weatherData, setWeatherData] = useState<stateData>();
  const [selectedAPI, setSelectedAPI] = useState<API>({
    title: "7timer",
    URL: "",
  });
  const [location, setLocation] = useState({
    name: "Vinkovci-(default)",
    latitude: 45.2879,
    longitude: 18.8057,
  });

  useEffect(() => {
    console.log(selectedAPI?.URL);

    if (
      location?.latitude !== undefined &&
      location.longitude !== undefined &&
      selectedAPI?.URL !== ""
    )
      fetch(selectedAPI?.URL)
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
  }, [location?.latitude, location?.longitude, selectedAPI?.URL]);
  weatherData ? console.log(weatherData) : console.log("2");

  return (
    <div className="App">
      {" "}
      <Location
        className={"location"}
        currentTime={weatherData?.time}
        location={location}
        selectedAPI={selectedAPI}
        setLocation={setLocation}
        setSelectedAPI={setSelectedAPI}
      />
      <SelectAPI className={"selectAPI"} />
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
      <div className="icons8">
        <a href="https://icons8.com" target="blank">
          icons by icons8{" "}
        </a>
      </div>
    </div>
  );
}

export default App;
