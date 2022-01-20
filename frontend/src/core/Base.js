import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "p-5    ",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron  text-center">
        <h2 className="display-4 pt-5">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
   
  </div>
);

export default Base;
