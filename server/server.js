/* eslint-disable no-console */
/**
 * ************************************
 *
 * @module  server.js
 * @author Benjamin Morrison/Timothy Mai
 * @date 11/5/19
 * @description creates server for application
 *
 * ************************************
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRouter');
const charityRouter = require('./routes/charityRouter');
const cookieController = require('./controllers/cookieController');
const apollo = require('./gql/apollo');

const PORT = process.env.PORT || 3000;
const app = express();

// plugin middleware for body parser and url encode
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// enable cors
app.use(cors());
// set up cookie parser
app.use(cookieParser());

// serves static files on public folder like styles and html
app.use(express.static(path.resolve(__dirname, '../public')));

// define route handler - getCharities, getCharity
app.use('/api/charity', charityRouter);

// define user API route handler - signIn, signUp
app.use('/api/user', userRouter);

// if not api call, serve index.html
app.get('/', cookieController.isLoggedIn, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// 404 for unknown routes
app.get('*', (req, res) => {
  res.status(404).send('Page not found!!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.log('handle failure');
  // initial error template
  const errorTemplate = {
    status: 500,
    message: 'Please try again.',
  };
  // this overwrites template with incoming messages from calling next({}).
  const error = Object.assign(errorTemplate, err);
  res.status(error.status).json({ message: error.message });
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
  // apollo.listen().then(({ url }) => {
  //   console.log(`Apollo server running ${url}`);
  // });
});
