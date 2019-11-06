const queryString = require('query-string');
const { differenceBy } = require('lodash');
const axios = require('axios');
const { query } = require('../db/index');
const config = require('../config');
const model = require('../db/charity.model');

const charityAPIEndpoint = 'https://api.data.charitynavigator.org/v2/Organizations';

const charityQuery = {
  app_id: config.charityAPI_appId,
  app_key: config.charityAPI_appKey,
};

const charityController = {};

/**
 * @name getCharities
 * @param req
 * @param res
 * @param next
 * @description selects all charities and load them into the res.locals.charities array
 */
charityController.getCharities = (req, res, next) => {
  const {
    zip,
    cause,
    rating,
  } = req.body;
  const userQuery = {
    zip,
    rating,
    cause,
  };
  if (!userQuery.zip) delete userQuery.zip;
  if (!userQuery.rating) delete userQuery.rating;
  if (!userQuery.cause) delete userQuery.cause;
  const outputQuery = Object.assign(charityQuery, userQuery);
  const stringified = queryString.stringify(outputQuery);
  const apiCall = charityAPIEndpoint + '?' + stringified;
  (async () => {
    try {
      const response = await axios(apiCall);
      const filterResponse = response.data.map((organization) => {
        const {
          ein, // unique id of charity
          charityName,
          charityNavigatorURL,
          mission,
          currentRating, // object
          category, // object
          mailingAddress,
        } = organization;
        return {
          ein, // unique id of charity
          name: charityName,
          website: charityNavigatorURL,
          mission,
          rate: currentRating ? currentRating.score : '',
          category: category ? category.categoryName : '',
          cause: organization.cause ? organization.cause.causeName : '',
          city: mailingAddress ? mailingAddress.city : '',
          state: mailingAddress ? mailingAddress.stateOrProvince : '',
          zip: mailingAddress ? mailingAddress.postalCode : '',
          contact: 'Not provided',
        };
      });
      res.locals.charities = filterResponse;
      return next();
    } catch (error) {
      return next(error);
    }
  })();
};

// call api for detail info of charity with ein
charityController.getCharity = (req, res, next) => {
  const { ein } = req.params;
  const stringified = queryString.stringify(query);
  const apiCall = charityAPIEndpoint + '/' + ein + '?' + stringified;
  (async () => {
    try {
      const response = await axios(apiCall);
      res.locals.charity = response.data;
      return next();
    } catch (error) {
      return next(error);
    }
  })();
};

// insert charity with unique ein to relief db
charityController.saveCharity = (req, res, next) => {
  (async () => {
    try {
      const response = await query(model.readCharity(), '');
      // filter charities w/ unique ein from rows from db
      const differentCharities = response.rows.length ? differenceBy(res.locals.charities, response.rows, 'ein') : res.locals.charities;
      // console.log(differentCharities);
      await query(model.createCharities(differentCharities), '');
      return next();
    } catch (error) {
      console.log(error);
      return next(error);
    }
  })();
};

module.exports = charityController;
