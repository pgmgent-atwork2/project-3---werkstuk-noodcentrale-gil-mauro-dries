/* eslint-disable consistent-return */
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { PUBLIC_PATH } from '../views/constants.js';

/**
 * The upload middleware
 * a user can upload a file via the browser
 * this middleware will save the file to the server
 */

export const saveAvatar = async (req, res, next) => {
  const { file } = req;

  console.log(file);

  // if no file is sent, skip this middleware
  if (!file) return next();

  // check if the file is an image
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/gif'
  ) {
    // filename: hello.png --> extract ".png"
    const extension = file.originalname.split('.').pop();
    const uniqueFileName = `${uuid()}.${extension}`;

    await sharp(file.buffer)
      .resize(128, 128, {
        fit: sharp.fit.cover,
        withoutEnlargement: true,
      })
      .toFile(`${PUBLIC_PATH}/img/avatar/${uniqueFileName}`);
  } else {
    console.log('File type not supported'); // console
    res.send('File type not supported'); // browser
  }

  next();
};
