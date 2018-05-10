import Mongoose from 'mongoose';
import Models from '../models';

const transact = Mongoose.connect('mongodb://localhost:27017/transact', (err) => {// eslint-disable-line
  if (err) {
    console.error('Could not connect to MongoDB on port 27017');// eslint-disable-line
  }
});

const Account = Mongoose.model('accounts', Mongoose.Schema(Models.account));

export {
  Account
};