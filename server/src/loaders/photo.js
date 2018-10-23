import DataLoader from 'dataloader';
import keyBy from 'lodash/keyBy';
import db from '../models';

const batchPhotos = async (ids) => {
  const { models: { Photo, User } } = db;
  
  const photos = await Photo.find({ postedBy: ids });
  const photoById = keyBy(photos, 'postedBy');
  
  return ids.map(id => photoById[id]);
}

export const photoLoader = () => new DataLoader(batchPhotos);