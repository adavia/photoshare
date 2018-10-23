import DataLoader from 'dataloader';
import keyBy from 'lodash/keyBy';
import db from '../models';

const batchUsers = async (ids) => {
  const { models: { User } } = db;
  
  const users = await User.find({ _id: ids });
  const userById = keyBy(users, '_id');

  return ids.map(id => userById[id]);
}

export const userLoader = () => new DataLoader(batchUsers);