const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
//
// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectID(id) : null;
//     this.userId = userId;
//   }
//
//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       //update product
//       dbOp = db.collection('products').updateOne(
//         {
//           _id: this._id,
//         },
//         { $set: this },
//       );
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => console.log(err));
//   }
//
//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find() //returns cursor - it is an object, that allows us to go through documents step by step
//       .toArray() //returns all results in array
//       .then((products) => {
//         return products;
//       })
//       .catch((err) => console.log(err));
//   }
//
//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectID(prodId) }) //get cursor
//       .next() //get the last document which is return
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }
//
//   static deleteById(prodId) {
//     const db = getDb();
//
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectID(prodId) })
//       .then(() => console.log('deleted'))
//       .catch((err) => console.log(err));
//   }
// }
//
// module.exports = Product;
