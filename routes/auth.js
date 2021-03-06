const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail(),
    body('password', 'Please enter 5 numbers and text')
      .isLength({ min: 5 })
      .withMessage('Please enter 5')
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin,
);

router.post('/logout', authController.postLogout);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-mail already exists  ');
          }
        });
      }),
    body('password', 'Please enter 5 numbers and text')
      .isLength({ min: 5 })
      .withMessage('Please enter 5')
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(`Password don't math`);
        }
        return true;
      }),
  ],
  authController.postSignup,
);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
