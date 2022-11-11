import { useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

const libraries: (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[] = ["places"];

export const SearchPlaces = () => {
  const inputRef: any = useRef();

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };
  // const places: any = ["places"];
  // let apiKey = "process.env.REACT_APP_GOOGLE_API_KEY" as const;
  // console.log(process.env.REACT_APP_GOOGLE_API_KEY);
  return (
    <LoadScript googleMapsApiKey={"#placeholder:123456"} libraries={libraries}>
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Enter Location"
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};
