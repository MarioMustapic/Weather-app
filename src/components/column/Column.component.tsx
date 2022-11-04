import "./Column.styles.scss";

type Props = { [index: number | string]: number | string | any[] | any };

export const Column = (props: Props): JSX.Element => {
  return <div className="column">{props.hourlyData}</div>;
};
