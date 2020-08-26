const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://oksana:2mKZMF4CryvtJJ8h@cluster0.hymvn.mongodb.net/shop?retryWrites=true&w=majority',
  ) //if shop database not exist - it creates new one
    .then((client) => {
      console.log('Connected!');
      _db = client.db(); //store database access
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
