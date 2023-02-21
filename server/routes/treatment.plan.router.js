const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET request to retrieve all current treatment plans
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /treatment-plan in treatment plan router');
    const queryText = `SELECT * FROM "treatment_plans";`;
    pool
        .query(queryText)
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making SELECT for treatment plans:', error);
            res.sendStatus(500);
        });
});
// POST request to add a new treatment plan

// EDIT request to edit a treatment plan

// Maybe a DELETE request to delete a treatment plan








module.exports = router;
