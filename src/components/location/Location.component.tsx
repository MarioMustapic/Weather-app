import { useState, useEffect } from "react";
import { SearchPlaces } from "../searchPlaces/SearchPlaces.component";
import "./Location.styles.scss";

type Props = {
  currentTime: number | string | any[] | any;
  className?: string;
  setLocation: Function;
  location: stateData;
};
interface stateData {
  name?: string;
  accuracy?: number;
  latitude: number;
  longitude: number;
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

  return (
    <div className={props.className}>
      <h2>
        Location <br /> {props.location.name}
      </h2>
      <div>
        <SearchPlaces />
      </div>
      <form></form>
    </div>
  );
};
