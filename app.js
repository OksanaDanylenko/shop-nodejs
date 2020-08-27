const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5f476587dd399a62cd1f9353')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err)); // this code runs for upcoming requests only
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3002);
});
