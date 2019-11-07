/**
 * ************************************
 *
 * @module  cookieController.js
 * @author Timothy Mai
 * @date 11/5/19
 * @description controller for cookies
 *
 * ************************************
 */

const cookieController = {};

// set a cookie
cookieController.setCookie = (req, res, next) => {
  // pull userID from res.locals.user
  const { id } = res.locals.user;

  // set cookie
  res.cookie('userID', id);

  return next();
};

// remove a cookie when user logs out
cookieController.removeCookie = (req, res, next) => {
  // removes cookie with name of "userID"
  res.clearCookie('userID');

  return next();
};

// check if you have a cookie already
cookieController.isLoggedIn = (req, res, next) => {
  // set isLoggedIn equal to false initially
  res.locals.isLoggedIn = false;

  // cookies would be stored on req.cookies
  // check if there is a cookie with the name of userID
  if (req.cookies.userID) {
    // set isLoggedIn equal to true
    res.locals.isLoggedIn = true;

    // save the userID
    // display that user's content
  }

  return next();
};

module.exports = cookieController;
