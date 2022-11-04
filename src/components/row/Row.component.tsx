import "./Row.styles.scss";

type Props = { [index: number | string]: number | string | any[] | any };

export const Row = (props: Props): JSX.Element => {
  //   console.log(props.rowData);

  return <div className="row"></div>;
};
