import mongoose from 'mongoose';

const photoSchema = mongoose.Schema({
  url: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  created: {
    type: Date, 
    default: Date.now
  },
  taggedUsers: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref : 'User'
  }]
});

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;
