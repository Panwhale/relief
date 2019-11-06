const express = require('express');
const charityController = require('../controllers/charityController');

const router = express.Router();

router.post('/', charityController.getCharities, (req, res) => {
  res.status(200).json(res.locals.charities);
});

router.post('/:ein', charityController.getCharity, (req, res) => {
  res.status(200).json(res.locals.charity);
});

module.exports = router;