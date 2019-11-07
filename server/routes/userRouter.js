/**
 * ************************************
 *
 * @module  api.js
 * @author Timothy Mai
 * @date 11/4/19
 * @description router for /api/user/ route
 *
 * ************************************
 */

const express = require('express');
const accountController = require('../controllers/accountController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

// route for sign up
// CHECK IF WE NEED THIS OR NOT
// router.get('/signup', (req, res) => {
//   res.status(200).send('this get signup route works yo');
//   // display signup page instead
// });

// route for adding new users
router.post('/signup', accountController.checkSignUpInfo, accountController.createUser, (req, res) => {
  res.status(200).json({
    username: res.locals.username,
  });
  // redirect to main page after creating user instead?
});

// route for sign in
router.post('/signin', accountController.checkLoginInfo, cookieController.setCookie, (req, res) => {
  res.status(200).json(res.locals.user);
});

module.exports = router;
