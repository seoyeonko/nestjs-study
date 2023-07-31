const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://tjdus2577:1234@cluster0.3sndhoe.mongodb.net/?retryWrites=true&w=majority';
// 'mongodb+srv://tjdus2577:1234@cluster0.3sndhoe.mongodb.net/?retryWrites=true&w=majority/test';

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
