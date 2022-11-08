import { Column } from "../column/Column.component";
import "./Card.styles.scss";

type Props = {
  currentTime: number | string | any[] | any;
  hourlyData?: { [index: number | string]: number[] };
  dailyData?: { [index: number | string]: number[] };
  className: string;
};
export const Card = (props: Props): JSX.Element => {
  // console.log(props.className, props?.hourlyData, props?.dailyData);

  const column: {}[] = [];
  if (props.hourlyData !== undefined && props.currentTime !== undefined) {
    let currentTime = props.currentTime[1];
    let hoursRange = 0;
    if (props.className === "currentWeather") hoursRange = 1;
    if (props.className === "next24h") hoursRange = 24;
    for (let i = 0; i < hoursRange; i++) {
      let ind = hoursRange > 1 ? i + currentTime + 1 : i + currentTime;
      let hourlyData = props.hourlyData;

      let hour = new Date(hourlyData.time[ind]).getHours();
      let temperature = hourlyData.temperature_2m[ind];
      let clouds = hourlyData.cloudcover[ind];
      let precipitation = hourlyData.precipitation[ind];
      let weatherCode = hourlyData.weathercode[ind];

      column.push({
        hour,
        temperature: temperature,
        clouds,
        precipitation,
        weatherCode,
      });
    }
  }
  if (props.dailyData !== undefined && props.currentTime !== undefined) {
    let dailyRange = 7;
    // if (props.className === "currentWeather") dailyRange = 1;
    // if (props.className === "next24h") dailyRange = 24;
    for (let i = 0; i < dailyRange; i++) {
      let ind = i;
      let dailyData = props.dailyData;

      let day = new Date(dailyData.time[ind]).toLocaleDateString();
      // console.log(props?.dailyData, dailyData.time[ind], day);

      let temperature = dailyData.temperature_2m_min[ind];
      // let clouds = dailyData.cloudcover[ind];
      let precipitation = dailyData.precipitation_sum[ind];
      let weatherCode = dailyData.weathercode[ind];

      column.push({
        day,
        temperature: temperature,
        precipitation,
        weatherCode,
      });
      // console.log(column);
    }
  }

  const columns = column?.map((column: any) => (
    <Column
      className={props.className}
      key={column.hour || column.day}
      columnData={column}
    />
  ));

  return <div className={"card " + props.className}>{columns}</div>;
};
