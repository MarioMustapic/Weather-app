import { Line } from "react-chartjs-2";
import { Column } from "../column/Column.component";
import "./Card.styles.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  currentTime: number | string | any[] | any;
  hourlyData?: { [index: number | string]: number[] };
  dailyData?: { [index: number | string]: number[] };
  className: string;
};

export const Card = (props: Props): JSX.Element => {
  // console.log(props.className, props?.hourlyData, props?.dailyData);
  const labels: number[] = [];
  const temperatureArray: number[] = [];
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

      labels.push(hour);
      temperatureArray.push(temperature);
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
      key={column?.hour || column?.day}
      columnData={column}
    />
  ));
  console.log(column);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: temperatureArray,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      {props.className === "next24h" && <Line data={data} />}
      <div className={"card " + props.className}> {columns}</div>
    </div>
  );
};
