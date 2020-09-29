const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://oksana:lhz13YDaxSXm5LJR@cluster0.hymvn.mongodb.net/shop? w=majority';

const app = express();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: 'sessions ' });

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);
//resave - session will not be saved on every request that is one

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user; //store mogoose methods for user
      next();
    })
    .catch((err) => console.log(err)); // this code runs for upcoming requests only
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .set('useUnifiedTopology', true)
  .set('useNewUrlParser', true)
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(3005);
  })
  .catch((err) => {
    console.log(err);
  });
