import React from "react";
import Main from "../../styles/main.module.scss";
import "./loader.css";

const Loader = () => {
  return (
    <div className={Main.fullscreen}>
      <div class="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
