import React from "react";
import useMeasure from "react-use-measure";

import Gate from "./Gate";
import Tiles from "./Tiles";
import TileFrame from "./TileFrame";

import "./styles.css";

export default function App() {
  const [ref, bounds] = useMeasure();
  return (
    <TileFrame ref={ref}>
      <Gate>
        <Tiles bounds={bounds} />
      </Gate>
    </TileFrame>
  );
}
