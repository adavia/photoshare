import DataLoader from 'dataloader';
import db from '../models';

const batchUsers = async (ids) => {
  const { models: { User } } = db;
  const users = await User.find({ id: { $in : ids } });
  const userMap = {};

  users.forEach(user => {
    userMap[user.id] = user;
  });

  return ids.map(id => userMap[id]);
}

export const userLoader = () => new DataLoader(batchUsers);