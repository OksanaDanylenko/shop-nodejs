const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  req.session.isLoggedIn;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5f48d7658c4aa87ed009e56f')
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect('/');
      }); // ensure that session created before continue
    })
    .catch((err) => console.log(err)); // this code runs for upcoming requests only
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => res.redirect('/'));
};
