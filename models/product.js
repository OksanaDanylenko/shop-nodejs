const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json',
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    fs.readFile(p, (err, fineContent) => {
      //p - path
      getProductsFromFile((products) => {
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) =>
          console.log('err', err),
        );
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  } //static - directly on the class itself, this isn't extension of object
};
