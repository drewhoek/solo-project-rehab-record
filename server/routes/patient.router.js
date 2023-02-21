const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Select all exercises from DB
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /patients in patients router');
    const queryText = `SELECT "first_name", "last_name" FROM "patients";`;
    pool
        .query(queryText)
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making SELECT for patients:', error);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log('POST request on /patients in patients router');
    const { first_name, last_name } = req.body;
    const queryText = `INSERT INTO "patients" ("first_name", "last_name") VALUES ($1, $2);`;
    pool
        .query(queryText, [first_name, last_name])
        .then((results) => res.sendStatus(201))
        .catch((error) => {
            console.log('Error making POST to patients:', error);
            res.sendStatus(500);
        });
});

// EDIT request to edit patient information
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in put route');
    const { first_name, last_name, has_treatment_plan } = req.body;
    const queryText = `UPDATE "patients" SET "first_name" = $1, "last_name" = $2, "has_treatment_plan" = $3 WHERE "id" = $4;`;
    pool
        .query(queryText, [first_name, last_name, has_treatment_plan, req.params.id])
        .then((results) => res.sendStatus(204))
        .catch((error) => {
            console.log('Error making PUT to patients:', error);
            res.sendStatus(500);
        });
});

// DELETE request to delete patient information
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in delete route');
    const queryText = `DELETE FROM "patients" WHERE "id" = $1;`;
    pool
        .query(queryText, [req.params.id])
        .then((results) => res.sendStatus(204))
        .catch((error) => {
            console.log('Error making PUT to patients:', error);
            res.sendStatus(500);
        });
});

module.exports = router;
