import React, { ReactElement } from "react";
import logo from "./logo.png";

const Logo: React.FC = (): ReactElement => {
  return (
    <div className="logo">
      <img src={logo} alt="Aviasales logo" />
    </div>
  );
};

export default Logo;
