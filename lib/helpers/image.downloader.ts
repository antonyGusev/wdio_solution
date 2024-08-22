import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { createWriteStream } from "fs";

export const downloadImage = async (url: string, filename: string): Promise<string> => {
  const dirPath = "./test.data/actual.images";
  const filePath = path.join(dirPath, filename);

  try {
    await fs.access(dirPath);
  } catch (error) {
    await fs.mkdir(dirPath);
  }

  const response = await axios.get(url, { responseType: "stream" });

  return new Promise((resolve, reject) => {
    response.data
      .pipe(createWriteStream(filePath))
      .on("error", reject)
      .once("close", () => resolve(filePath));
  });
};
