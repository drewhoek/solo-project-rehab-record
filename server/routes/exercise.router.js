const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Select all exercises from DB
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('GET request on /exercises in exercise router');
  pool
    .query(`SELECT * FROM "exercise_bank";`)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for exercises:', error);
      res.sendStatus(500);
    });
});

// TODO Select exercise variations for specific exercise

router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
