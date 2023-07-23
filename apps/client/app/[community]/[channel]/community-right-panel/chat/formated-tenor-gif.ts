const getContainerHeight = ({
  width,
  height,
  parentWidth = 256,
}: {
  width: number;
  height: number;
  parentWidth?: number;
}): number => {
  return (parentWidth * height) / width;
};

export const formatedTenorGif = (tenorGif) => {
  if (!tenorGif) {
    return;
  }

  const { width, height } = tenorGif;

  const containerHeight = getContainerHeight({ width, height });

  return {
    ...tenorGif,
    containerHeight,
  };
};
