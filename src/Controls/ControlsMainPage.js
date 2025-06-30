import React from "react";
import ControlsMainGraph from "./ControlsMainGraph";
import ControlsDetails from "./ControlDetails/ControlsDetails";

function ControlsMainPage() {
  return (
    <div>
      <ControlsMainGraph />
      <br />
      <ControlsDetails />
      <br />
    </div>
  );
}

export default ControlsMainPage;
