function calculateSize({ width, height, padding, amountX, amountY }) {
  const maxWidth = width / amountX;
  const maxHeight = height / amountY;
  return Math.min(maxWidth, maxHeight) - padding;
}

function calculateOffset({ width, height, size, padding, amountX, amountY }) {
  const offsetX = width - (size * amountX + (amountX - 1) * padding);
  const offsetY = height - (size * amountY + (amountY - 1) * padding);
  return [offsetX, offsetY];
}

function useSizeAndOffset({ bounds, amountX, amountY, padding }) {
  const size = calculateSize({
    width: bounds.width,
    height: bounds.height,
    padding,
    amountX,
    amountY
  });
  const offset = calculateOffset({
    width: bounds.width,
    height: bounds.height,
    padding,
    size,
    amountX,
    amountY
  });

  return {
    size,
    offset
  };
}

export default useSizeAndOffset;
