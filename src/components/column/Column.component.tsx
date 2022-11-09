import "./Column.styles.scss";
import LazyLoad from "react-lazy-load";

type Props = { [index: number | string]: number | string | any[] | any };

export const Column = (props: Props): JSX.Element => {
  let clouds: string = "";
  let cloudCover = props.columnData?.clouds;
  if (66 < cloudCover) clouds = "cloud-80";
  if (33 <= cloudCover && cloudCover <= 66) clouds = "partly-cloudy-day-80";
  if (cloudCover < 33) clouds = "sun-80";

  let weatherCode: string = "";
  let weatherCodeAlt: string = "";
  switch (props.columnData?.weatherCode) {
    case 0: // 0	Clear sky
      weatherCode = "sun-80";
      weatherCodeAlt = "clear sky";
      break;
    case 1: // 1, 2, 3	Mainly clear, partly cloudy, and overcast
      weatherCode = "sun-80";
      weatherCodeAlt = "mainly clear sky";
      break;
    case 2:
      weatherCode = "partly-cloudy-day-80";
      weatherCodeAlt = "partly cloudy sky";
      break;
    case 3:
      weatherCode = "cloud-80";
      weatherCodeAlt = "overcast sky";
      break;
    case 45: // 45, 48	Fog and depositing rime fog
      weatherCode = "haze-80";
      weatherCodeAlt = "fog";
      break;
    case 48:
      weatherCode = "haze-80";
      weatherCodeAlt = "depositing rime fog";
      break;
    case 51: // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
      weatherCode = "rain-cloud-drizzle-80";
      weatherCodeAlt = "light drizzle";
      break;
    case 53:
      weatherCode = "heavy-rain1-80";
      weatherCodeAlt = "moderate drizzle";
      break;
    case 55:
      weatherCode = "heavy-rain2-80";
      weatherCodeAlt = "dense drizzle";
      break;
    case 56: // 56, 57	Freezing Drizzle: Light and dense intensity
      weatherCode = "rain-cloud-drizzle-80";
      weatherCodeAlt = "light freezing drizzle";
      break;
    case 57:
      weatherCode = "heavy-rain2-80";
      weatherCodeAlt = "dense freezing drizzle";
      break;
    case 61: // 61, 63, 65	Rain: Slight, moderate and heavy intensity
      weatherCode = "light-rain-80";
      weatherCodeAlt = "slight rain";
      break;
    case 63:
      weatherCode = "rain-80";
      weatherCodeAlt = "moderate rain";
      break;
    case 65:
      weatherCode = "rainfall-80";
      weatherCodeAlt = "heavy rain";
      break;
    case 66: //66, 67	Freezing Rain: Light and heavy intensity
      weatherCode = "light-rain-80";
      weatherCodeAlt = "light freezing rain";
      break;
    case 67:
      weatherCode = "rainfall-80";
      weatherCodeAlt = "heavy freezing rain";
      break;
    case 71: //71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
      weatherCode = "light-snow-80";
      weatherCodeAlt = "slight snow fall";
      break;
    case 73:
      weatherCode = "snow-80";
      weatherCodeAlt = "moderate snow fall";
      break;
    case 75:
      weatherCode = "snow-storm-80";
      weatherCodeAlt = "heavy snow fall";
      break;
    case 77: //77	Snow grains
      weatherCode = "hail-80";
      weatherCodeAlt = "snow grains";
      break;
    case 80: // 80, 81, 82	Rain showers: Slight, moderate, and violent
      weatherCode = "rain-cloud-80";
      weatherCodeAlt = "slight rain shower";
      break;
    case 81:
      weatherCode = "heavy-rain1-80";
      weatherCodeAlt = "moderate rain shower";
      break;
    case 82:
      weatherCode = "torrential-rain-80";
      weatherCodeAlt = "violent rain shower";
      break;
    case 85: //85, 86	Snow showers slight and heavy
      weatherCode = "snow-80";
      weatherCodeAlt = "slight snow shower";
      break;
    case 86:
      weatherCode = "snow-storm-80";
      weatherCodeAlt = "heavy snow shower";
      break;
    case 95: //95 *	Thunderstorm: Slight or moderate
      weatherCode = "storm-80";
      weatherCodeAlt = "thunderstorm";
      break;
    case 96: // 96, 99 *	Thunderstorm with slight and heavy hail
      weatherCode = "storm-80";
      weatherCodeAlt = "thunderstorm with slight hail";
      break;
    case 99: // (*) Thunderstorm forecast with hail is only available in Central Europe
      weatherCode = "storm-80";
      weatherCodeAlt = "thunderstorm with heavy hail";
      break;

    default:
      console.log(
        "something broke: weathercode switch",
        props.columnData?.weatherCode
      );

      break;
  }
  // console.log(props?.columnData);
  // let columnData = [props?.columnData];
  // const rows = columnData?.map((rowData: any) => (
  //   <Row key={rowData.hour} rowData={rowData} />
  // ));
  return (
    <div className={"column " + props.className}>
      <p>{props.columnData.day || props.columnData.hour + ":00"}</p>
      <p>{props.columnData.temperature}&#8451;</p>
      <p>{props.columnData.precipitation} mm</p>
      {props.columnData.clouds !== undefined && (
        <div className="clouds">
          Clouds {props.columnData.clouds}%
          <LazyLoad width={20}>
            <img
              src={require(`../../assets/images/icons8-${clouds}.png`)}
              alt="clouds"
            />
          </LazyLoad>
        </div>
      )}
      <div className="weatherCode">
        <LazyLoad>
          <img
            src={require(`../../assets/images/icons8-${weatherCode}.png`)}
            alt={weatherCodeAlt}
          />
        </LazyLoad>
        {weatherCodeAlt}
      </div>
    </div>
  );
};

// WMO Weather interpretation codes (WW)
// Code	Description
// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail
// (*) Thunderstorm forecast with hail is only available in Central Europe
