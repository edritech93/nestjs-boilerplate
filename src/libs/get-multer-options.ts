import { MulterModuleOptions } from '@nestjs/platform-express';
import { FileFilterCallback, diskStorage } from 'multer';
import { mkdirSync, existsSync } from 'fs';
import { JwtModel } from 'src/user-auth/dto/jwt.model';

const storage = diskStorage({
  destination(req, _: Express.Multer.File, callback) {
    const jwtModel = req.user as JwtModel;
    const folder = `./uploads/${jwtModel.id}`;
    if (folder) {
      if (!existsSync(folder)) {
        mkdirSync(folder, { recursive: true });
      }
      callback(null, folder);
    } else {
      callback(null, null);
    }
  },
  filename(req, file: Express.Multer.File, callback) {
    if (req) {
      const modifiedFileName = `${new Date().getTime()}-${file.originalname.replace(
        /\s/g,
        '',
      )}`;
      const fileName = `${modifiedFileName}`;
      callback(null, fileName);
    } else {
      callback(null, null);
    }
  },
});

const fileFilter = (
  _: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  const filetypes = /jpeg|jpg|png|HEIC|/;
  const extArray = file.mimetype.split('/');
  const extension = extArray[extArray.length - 1];
  const extname = filetypes.test(extension);
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const multerOptions: MulterModuleOptions = {
  storage: storage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter,
};
