import DataLoader from 'dataloader';
import keyBy from 'lodash/keyBy';
import db from '../models';

const batchPhotos = async (ids) => {
  const { models: { Photo } } = db;
  
  const photos = await Photo.find({ _id: ids });

  const photoById = keyBy(photos, '_id');
  
  return ids.map(id => photoById[id]);
}

export const photoLoader = () => new DataLoader(batchPhotos);