/* eslint-disable no-console */
/**
 * ************************************
 *
 * @module  accountController.js
 * @author Timothy Mai
 * @date 11/4/19
 * @description controller containing middleware for account-related tasks
 *
 * ************************************
 */

 
const { pool } = require('../db/index');
const queries = require('../db/user.model');

const accountController = {};

// check if sign up email or username has been used or not
accountController.checkSignUpInfo = (req, res, next) => {
  // pull username and email from req.body
  const { username, email } = req.body;

  // run query to see if email or username has already been used
  pool.query(queries.checkUsernameAndEmail, [username, email], (err, result) => {
    if (err) {
      console.error('error found in checking username and password', err);
      return next({
        message: 'DB down',
        status: 500,
      });
    }

    if (result.rows.length > 0) {
      console.log('username or email has already been used');

      return next({
        message: 'username or email has already been used',
        status: 200,
      });
      // CONSIDER DISPLAYING AN ERROR MESSAGE OF SOME SORT INSTEAD
    }

    return next();
  });
};

// after passing checkUsernameAndEmail, create new user
accountController.createUser = (req, res, next) => {
  // pull username, password, and email from req.body
  const { username, password, email } = req.body;

  // run query to add user to database
  pool.query(queries.createUser, [username, password, email], (err, result) => {
    if (err) {
      console.error('error found in creating user', err);
      return next({
        message: 'DB down',
        status: 500,
      });
    }
    res.locals.username = result.rows[0].username;
    return next();
  });
};

// sign in
accountController.checkLoginInfo = (req, res, next) => {
  // pull username and password from req.body
  const { username, password } = req.body;

  // CONSIDER ADDING FUNCTIONALITY TO CHECK FOR EMAIL & PASSWORD IN ADDITION TO USERNAME & PASSWORD

  // will add cookies later

  // run query to see if user credentials is accurate
  pool.query(queries.getUser, [username, password], (err, result) => {
    if (err) {
      console.error('error found in getting user info', err);
      return next({
        message: 'DB down',
        status: 500,
      });
    }

    if (result.rows.length > 0) {
      console.log('logged in!');
      const {
        id,
        // username, // we already have username saved in the outer scope
        email,
      } = result.rows[0];

      res.locals.user = {
        id,
        username,
        email,
        verified: true,
      };
      return next();
    }
    return next({
      message: 'Login unsuccessful. Please check your username or password.',
      status: 200,
    });
  });
};

module.exports = accountController;
