import { Column } from "../column/Column.component";
import "./Card.styles.scss";

type Props = {
  currentTime: number | string | any[] | any;
  hourlyData: { [index: number | string]: number[] };
};
export const Card = (props: Props): JSX.Element => {
  console.log(props.hourlyData);
  console.log(props.currentTime?.[1]);

  const hourly: {}[] = [];
  if (props.hourlyData !== undefined && props.currentTime !== undefined) {
    let currentTime = props?.currentTime[1];
    for (let i = 0; i < 24; i++) {
      let abcd = new Date(props.hourlyData?.time[i + currentTime]);
      let e = abcd.getHours();
      hourly.push(e);
    }
    console.log(hourly);
  }
  const columns = hourly?.map((hourly: any) => (
    <Column key={hourly} hourlyData={hourly} />
  ));

  return <div className="card">{columns}</div>;
};
