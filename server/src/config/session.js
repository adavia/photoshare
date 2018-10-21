import session from 'express-session';
import mongoStore from 'connect-mongo';
import config from './';
import db from '../models';

const sessionStore = mongoStore(session);

const sessionConfig = session({
  name: 'token',
  secret: config.app.sessionSecret,
  resave: false,
  saveUninitialized: process.env.NODE_ENV === 'development',
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  },
  store: new sessionStore({
    mongooseConnection: db.mongoose.connection
  })
});

export default sessionConfig;
