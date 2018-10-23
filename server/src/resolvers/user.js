import validation from '../utils/validation';

export default {
  Query: {
    me: async (parent, args, { models, session }) => {
      return await models.User.findById(session.userId);
    },

    totalUsers: async (parent, args, { models }) => {
      return await models.User.count();
    },

    allUsers: async (parent, args, { models }) => {
      return await models.User.find();
    }
  },

  Mutation: {
    login: async (parent, args, { models, session }) => {
      const { email, password } = args;
      const userExist = await models.User.findOne({ email });

      if (!userExist) {
        throw new Error(`No such user found with email ${email}`);
      }

      if (!userExist.validPassword(password)) {
        throw new Error('Password is not correct!');
      }

      session.userId = userExist._id;

      return userExist;
    },

    signup: async (parent, args, { models }) => {
      try {
        const createdUser = await models.User.create(args);
        return createdUser;
      }
      catch(err) { 
        validation(err);
      }
    },

    logout: async (parent, args, { models, session }) => {
      const { userId } = session;

      if (userId) {
        session.destroy(err => {
          if (err) {
            console.log(err);
          }
        });
        return true;
      }

      return false;
    }
  },

  User: {
    id: parent => parent.id || parent._id,
    avatar: (parent, args, { models, loaders }) => {
      return loaders.photoLoader.load(parent.id);
    }
  }
}