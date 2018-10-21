import shortid from 'shortid';
import { createWriteStream } from 'fs';
import sharp from 'sharp';

const storeUpload = async ({ stream }) => {
  // aseq2
  const id = shortid.generate();
  const path = `src/public/photos/${id}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject)
  );
}

export default async (upload) => {
  const { stream } = await upload;
  const { id, path } = await storeUpload({ stream });

  const resizedImage = sharp(path)
    .resize(150, 150)
    .toFile(`src/public/thumbs/${id}`)
    .then(img => {
      return id;
    })
    .catch(err => {
      return err
    })
  
  try {
    const photo = await resizedImage;
    return photo;
  } catch (error) {
    throw new Error(err)
  }
}