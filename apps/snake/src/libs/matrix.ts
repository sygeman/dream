export const createMatrix = (): [number, number][] => {
  const size = 16;
  let matrixAsArray: [number, number][] = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      matrixAsArray.push([i, j]);
    }
  }

  return matrixAsArray;
};

export const matrixAsArray = createMatrix();
