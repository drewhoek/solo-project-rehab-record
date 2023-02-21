const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { query } = require('express');

// Select all exercises from DB
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('GET request on /exercise in exercise router');
  const queryText = `SELECT "exercise_name" FROM "exercise_bank";`;
  pool
    .query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for exercises:', error);
      res.sendStatus(500);
    });
});

// Select exercise variations for specific exercise
router.get('/variations', rejectUnauthenticated, (req, res) => {
  console.log('GET request on /exercise/variations in exercise router');
  const { exercise_id } = req.body;
  const queryText = `SELECT "exercise_variation" FROM "exercise_variations"
  WHERE "exercise_id" = $1;`;
  pool
    .query(queryText, [exercise_id])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for exercises:', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
