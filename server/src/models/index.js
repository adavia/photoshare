import mongoose from 'mongoose';
import config from '../config';
import User from './user';
import Photo from './photo';

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, { 
  useNewUrlParser: true 
});
mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

mongoose.connection.on('error', (err) => {
	if (err) throw err;
});

export default { mongoose, 
	models: {
		User,
		Photo
	}
};