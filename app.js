const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5f48d7658c4aa87ed009e56f')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err)); // this code runs for upcoming requests only
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://oksana:lhz13YDaxSXm5LJR@cluster0.hymvn.mongodb.net/shop?retryWrites=true&w=majority',
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Oksana',
          email: 'test@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3002);
  })
  .catch((err) => console.log(err));
