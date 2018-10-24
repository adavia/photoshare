import { GraphQLScalarType } from 'graphql';

import validation from '../utils/validation';
import processUpload from '../utils/upload';

export default {
  Query: {
    totalPhotos: async (parent, args, { models }) => {
      return await models.Photo.count();
    },

    allPhotos: async (parent, args, { models }) => {
      const { limit, offset } = args; 
      return await models.Photo.find().skip(offset).limit(limit);
    }
  },
  
  Mutation: {
    createPhoto: async (parent, { input }, { models, session, pubsub }) => {
      const processedFiles = input.file.map(async file => {
        const photo = await processUpload(file);

        return {
          name: photo,
          postedBy: session.userId
        }
      });

      const uploadedFiles = await Promise.all(processedFiles);
      
      try {
        const savedPhotos = await models.Photo.insertMany(uploadedFiles);
        
        await models.User.update(
          { _id: session.userId },
          { $addToSet: {
            photos: savedPhotos.map(photo => photo._id)
          },
          avatar: savedPhotos[0]._id}
        );
        //pubsub.publish('photo-added', { savedPhotos });

        return savedPhotos;
      }
      catch(err) { 
        validation(err);
      }
    }
  },

  Subscription: {
    newPhoto: {
      subscribe: (parent, args, { session, pubsub }) => {
        return pubsub.asyncIterator('photo-added');
      }
    }
  },
  
  Photo: {
    id: parent => parent.id || parent._id,
    url: (parent, args, { url }) => {
      if (parent.name) {
        return `${url}/photos/${parent.name}`
      }
    },
    thumb: (parent, args, { url }) => {
      if (parent.name) {
        return `${url}/thumbs/${parent.name}`
      }
    },
    postedBy: (parent, args, { loaders }) => {
      return loaders.userLoader.load(parent.postedBy);
    }
  },

  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value.',
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value
  })
}