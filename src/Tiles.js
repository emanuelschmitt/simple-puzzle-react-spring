import React from "react";
import { useSprings, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import clamp from "lodash.clamp";
import shuffle from "lodash.shuffle";

import swap from "./swap";
import Tile from "./Tile";
import useSizeAndOffset from "./useSizeAndOffset";

const padding = 8;
const tiles = new Array(16).fill(0);

const getX = (index, size, offsetX) =>
  (index % 4) * (size + padding) + offsetX / 2;
const getY = (index, size, offsetY) =>
  Math.floor(index / 4) * (size + padding) + offsetY / 2;

function setter({
  order,
  down,
  index,
  xDelta = 0,
  yDelta,
  size = 0,
  offset: [offsetX, offsetY]
} = {}) {
  return i => {
    const isSelected = index === i;
    const orderIndex = order.indexOf(i);
    return {
      x:
        down && isSelected && typeof yDelta === "number"
          ? getX(orderIndex, size, offsetX) + xDelta
          : getX(orderIndex, size, offsetX),
      y:
        down && isSelected && typeof yDelta === "number"
          ? getY(orderIndex, size, offsetY) + yDelta
          : getY(orderIndex, size, offsetY),
      scale: down && isSelected ? 1.25 : 1,
      zIndex: down && isSelected ? 100 : 1,
      immediate: n => n === "zIndex"
      // config: { mass: 1, tension: 200, friction: 2 }
    };
  };
}

function intersectingIndex([x, y], size, [offsetX, offsetY]) {
  const xIndex = Math.floor((x - offsetX / 2) / (size + padding)) % 4;
  const yIndex = Math.floor((y - offsetY / 2) / (size + padding));
  return clamp(yIndex * 4 + xIndex, 0, 16);
}

function Tiles({ bounds }) {
  const { size, offset } = useSizeAndOffset({
    bounds,
    amountX: 4,
    amountY: 4,
    padding
  });
  const order = React.useRef(shuffle(tiles.map((_, index) => index)));

  const [springs, set] = useSprings(
    tiles.length,
    setter({ order: order.current, size, offset })
  );

  React.useEffect(() => {
    set(setter({ order: order.current, size, offset }));
  }, [size, offset, set]);

  const bind = useGesture(
    ({ down, xy, args: [index], delta: [xDelta, yDelta] }) => {
      const currentPosition = order.current.indexOf(index);
      const newPosition = intersectingIndex(xy, size, offset);

      if (!down && currentPosition !== newPosition) {
        const newOrder = swap(
          order.current,
          order.current.indexOf(index),
          newPosition
        );
        order.current = newOrder;
      }

      set(
        setter({
          order: order.current,
          down,
          index,
          xDelta,
          yDelta,
          size,
          offset
        })
      );
    }
  );

  return springs.map(({ x, y, scale, zIndex }, i) => (
    <Tile
      {...bind(i)}
      style={{
        transform: interpolate(
          [x, y, scale],
          (x, y, scale) => `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        ),
        zIndex,
        height: size,
        width: size,
        backgroundImage: `url(./image_part_${String(i + 1).padStart(
          3,
          "0"
        )}.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
      key={i}
    />
  ));
}

export default Tiles;
