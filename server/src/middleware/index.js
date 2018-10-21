import { isAuthenticated } from './authentication';

export default {
  Query: {
    me: isAuthenticated,
    allUsers: isAuthenticated,
    totalUsers: isAuthenticated,
    allPhotos: isAuthenticated
  },
  Mutation: {
    createPhoto: isAuthenticated
  }
}