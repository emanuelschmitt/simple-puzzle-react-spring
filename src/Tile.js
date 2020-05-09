import styled from "styled-components";
import { animated } from "react-spring";

const Tile = styled(animated.div)({
  background: "#c2dfe3",
  position: "absolute",
  borderRadius: 16,
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "8px 8px 40px 2px rgba(0,0,0,0.01)",
  userSelect: "none",
  "&:hover": {
    cursor: "grab"
  },
  "&:active": {
    cursor: "grabbing"
  },
  fontSize: "3em"
});

export default Tile;
