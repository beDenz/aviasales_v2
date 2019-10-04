import React, { ReactElement } from "react";
import "./loader.scss";

const Loader: React.FC = (): ReactElement => {
  return (
    <div className="loader">
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loader;
