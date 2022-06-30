import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Coming() {
  return (
    <div className="App">
      <Coming
        title="Staking Program"
        subtitle="See you in"
        bgColor="#2A2A29"
        textColor="#FF7133"
        date="Mon Sep 01 2022 13:00:00 GMT+0700 (Mountain Daylight Time)"
        illustration="web-development"
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Coming />, rootElement);
