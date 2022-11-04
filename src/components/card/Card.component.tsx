import { Column } from "../column/Column.component";
import "./Card.styles.scss";

type Props = {
  currentTime: number | string | any[] | any;
  hourlyData: { [index: number | string]: number[] };
};
export const Card = (props: Props): JSX.Element => {
  // console.log(props.hourlyData);

  const column: {}[] = [];
  if (props.hourlyData !== undefined && props.currentTime !== undefined) {
    let currentTime = props.currentTime[1];
    for (let i = 0; i < 24; i++) {
      let ind = i + currentTime;
      let hourlyData = props.hourlyData;

      let hour = new Date(hourlyData.time[ind]).getHours();
      let temperature = hourlyData.temperature_2m[ind];
      let clouds = hourlyData.cloudcover[ind];
      let precipitation = hourlyData.precipitation[ind];

      column.push({
        hour,
        temperature: temperature,
        clouds,
        precipitation,
      });
    }
    // console.log(column);
  }
  const columns = column?.map((column: any) => (
    <Column key={column.hour} hourlyData={column} />
  ));

  return <div className="card">{columns}</div>;
};
