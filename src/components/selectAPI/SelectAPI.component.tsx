import "./SelectAPI.styles.scss";

type Props = {
  className?: string;
};

export const SelectAPI = (props: Props): JSX.Element => {
  return (
    <div className={props.className}>
      <div className="credit">
        {" "}
        <a
          href="https://open-meteo.com/"
          target="_blank noreferrer"
          className="notranslate"
        >
          Weather data by Open-Meteo.com
        </a>
      </div>
    </div>
  );
};
