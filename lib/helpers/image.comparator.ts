import pixelmatch from "pixelmatch";
import fs from "fs/promises";
import jpeg from "jpeg-js";

const readFile = async (pathToFile: string) => {
  return fs.readFile(`${process.cwd()}\\${pathToFile}`);
};

export const compareImages = async (pathToActual: string, pathToExpected: string) => {
  const actual = jpeg.decode(await readFile(pathToActual));
  const expected = jpeg.decode(await readFile(pathToExpected));
  
  const { width, height } = expected;

  const result = pixelmatch(
    actual.data,
    expected.data,
    null,
    width,
    height,
    {
      threshold: 0.1
    }
  );

  return result;
};
