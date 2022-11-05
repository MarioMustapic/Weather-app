import "./Column.styles.scss";
import clouds100 from "../../assets/images/icons8-cloud-80.png";
import clouds50 from "../../assets/images/icons8-partly-cloudy-day.gif";
import clouds0 from "../../assets/images/icons8-sun.gif";

type Props = { [index: number | string]: number | string | any[] | any };

export const Column = (props: Props): JSX.Element => {
  let clouds: string = "";
  let cloudCover = props.hourlyData?.clouds;
  if (66 < cloudCover) clouds = clouds100;
  if (33 <= cloudCover && cloudCover <= 66) clouds = clouds50;
  if (cloudCover < 33) clouds = clouds0;

  // console.log(props?.hourlyData);
  // let hourlyData = [props?.hourlyData];
  // const rows = hourlyData?.map((rowData: any) => (
  //   <Row key={rowData.hour} rowData={rowData} />
  // ));
  return (
    <div className={"column " + props.className}>
      <p>{props.hourlyData.hour}:00</p>
      <p>{props.hourlyData.temperature}&#8451;</p>
      <p>{props.hourlyData.precipitation} mm</p>
      <p>
        {props.hourlyData.clouds} <img src={clouds} alt="clouds" />
      </p>
    </div>
  );
};
