import "./Column.styles.scss";

type Props = { [index: number | string]: number | string | any[] | any };

export const Column = (props: Props): JSX.Element => {
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
      <p>{props.hourlyData.clouds}</p>
    </div>
  );
};
