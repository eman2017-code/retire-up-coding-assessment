import React from "react";

//SLIDER NPM IMPORT
import Slider, { Range } from "rc-slider";

//STYLE IMPORT
import "../../assets/style.css";
import "rc-slider/assets/index.css";

export default function SliderComponent() {
  return (
    <div id="slider">
      <Slider />
    </div>
  );
}
