import { useState, useEffect } from "react";
import { SearchPlaces } from "../searchPlaces/SearchPlaces.component";
import "./Location.styles.scss";

type Props = {
  currentTime: number | string | any[] | any;
  className?: string;
  setLocation: Function;
  setSelectedAPI: Function;
  location: stateData;
  selectedAPI: API;
};
interface stateData {
  name?: string;
  accuracy?: number;
  latitude: number;
  longitude: number;
}
interface API {
  URL: string;
  title: string;
}
interface APIs {
  [key: number]: API;
}
export const Location = (props: Props): JSX.Element => {
  const [state, setState] = useState<stateData>();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos: any) {
      setState(() => ({
        ...pos.coords,
        accuracy: pos.coords.accuracy,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }));
      console.log(pos.coords);
      if (state?.latitude !== undefined && state.longitude !== undefined) {
        console.log("Your current location is:");
        console.log(`Latitude : ${state?.latitude}`);
        console.log(`Longitude: ${state?.longitude}`);
        console.log(`More or less ${state?.accuracy} meters.`);
      }
    }
    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [state?.latitude, state?.longitude, state?.accuracy]);

  const listOfAPIs: APIs = [
    {
      title: "open-meteo.com",
      URL: `https://api.open-meteo.com/v1/forecast?latitude=${state?.latitude}&longitude=${state?.longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth,freezinglevel_height,weathercode,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,evapotranspiration,et0_fao_evapotranspiration,vapor_pressure_deficit,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm,soil_moisture_9_27cm,soil_moisture_27_81cm,shortwave_radiation,direct_radiation,diffuse_radiation,direct_normal_irradiance,terrestrial_radiation,shortwave_radiation_instant,direct_radiation_instant,diffuse_radiation_instant,direct_normal_irradiance_instant,terrestrial_radiation_instant,temperature_1000hPa,temperature_975hPa,temperature_950hPa,temperature_925hPa,temperature_900hPa,dewpoint_1000hPa,dewpoint_975hPa,dewpoint_950hPa,dewpoint_925hPa,dewpoint_900hPa,relativehumidity_1000hPa,relativehumidity_975hPa,relativehumidity_950hPa,relativehumidity_925hPa,relativehumidity_900hPa,cloudcover_1000hPa,cloudcover_975hPa,cloudcover_950hPa,cloudcover_925hPa,cloudcover_900hPa,windspeed_1000hPa,windspeed_975hPa,windspeed_950hPa,windspeed_925hPa,windspeed_900hPa,winddirection_1000hPa,winddirection_975hPa,winddirection_950hPa,winddirection_925hPa,winddirection_900hPa,geopotential_height_1000hPa,geopotential_height_975hPa,geopotential_height_950hPa,geopotential_height_925hPa,geopotential_height_900hPa&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=auto`,
    },
    {
      title: "7timer",
      URL: `http://www.7timer.info/bin/api.pl?lon=${state?.longitude}&lat=${state?.latitude}&product=civil&output=json
    `,
    },
  ];
  if (
    props.selectedAPI.URL === "" &&
    state?.latitude !== undefined &&
    state?.longitude !== undefined
  )
    props.setSelectedAPI(listOfAPIs[0]);

  return (
    <div className={props.className}>
      <h2>
        Location <br /> {props.location.name}
      </h2>
      <div>
        <SearchPlaces />
      </div>
    </div>
  );
};
