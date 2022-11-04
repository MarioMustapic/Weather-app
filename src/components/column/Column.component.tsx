import "./Column.styles.scss";

type Props = { [index: number | string]: number | string | any[] | any };

export const Column = (props: Props): JSX.Element => {
  // console.log(props?.hourlyData);
  // let hourlyData = [props?.hourlyData];
  // const rows = hourlyData?.map((rowData: any) => (
  //   <Row key={rowData.hour} rowData={rowData} />
  // ));
  return (
    <div className="column">
      <p>{props.hourlyData.hour}</p>
      <p>{props.hourlyData.temperature}</p>
      <p>{props.hourlyData.precipitation}</p>
      <p>{props.hourlyData.clouds}</p>
    </div>
  );
};
