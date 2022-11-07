import "./Column.styles.scss";
import clouds100 from "../../assets/images/icons8-cloud-80.png";
import clouds50 from "../../assets/images/icons8-partly-cloudy-day-80.png";
import clouds0 from "../../assets/images/icons8-sun-80.png";

type Props = { [index: number | string]: number | string | any[] | any };

export const Column = (props: Props): JSX.Element => {
  let clouds: string = "";
  let cloudCover = props.columnData?.clouds;
  if (66 < cloudCover) clouds = clouds100;
  if (33 <= cloudCover && cloudCover <= 66) clouds = clouds50;
  if (cloudCover < 33) clouds = clouds0;
  if (0 < 33) console.log("lol");

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
      {props.columnData.clouds + 1 && (
        <p>
          {props.columnData.clouds} <img src={clouds} alt="clouds" />
        </p>
      )}
      <p>{props.columnData.weatherCode}</p>
    </div>
  );
};
