import crypto from "crypto";
import multer, { StorageEngine } from "multer";
import path from "path";

const uploadFolder = path.resolve(__dirname, "../../", "uploads");
const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

interface IUploadConfig {
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
}

export default {
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const namePrefix = crypto.randomBytes(10).toString("hex");

        const filename = `${namePrefix}-${file.originalname}`;

        if (file.mimetype === "text/csv") {
          callback(null, filename);
        } else {
          callback(new Error("Invalid file format"), null);
        }
      },
    }),
  },
} as IUploadConfig;
