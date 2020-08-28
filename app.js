const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));
//
// app.use((req, res, next) => {
//   User.findById('5f476587dd399a62cd1f9353')
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => console.log(err)); // this code runs for upcoming requests only
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://oksana:lhz13YDaxSXm5LJR@cluster0.hymvn.mongodb.net/shop?retryWrites=true&w=majority',
  )
  .then(() => app.listen(3002))
  .catch((err) => console.log(err));
