const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Select all patients from DB
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /patients in patients router');
    const queryText = `SELECT * FROM "patients";`;
    pool
        .query(queryText)
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making SELECT for patients:', error);
            res.sendStatus(500);
        });
});

router.get('/with-treatment-plan', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /patients/with-treatment-plan in patients router');
    const queryText = `SELECT "first_name", "last_name", "treatment_plans"."id" AS "treatment_plan_id" FROM "patients"
    JOIN "treatment_plans" ON "patients"."id" = "treatment_plans"."patient_id" WHERE "has_treatment_plan" = TRUE;`;
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


// -------------------- For specific patient --------------- //

// EDIT request to edit patient information
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in put route');
    const queryText = `UPDATE "patients" SET "has_treatment_plan" = TRUE WHERE "id" = $1;`;
    pool
        .query(queryText, [req.params.id])
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

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /patients in patients router');
    const queryText = `SELECT * FROM "patients" WHERE "id" = $1;`;
    pool
        .query(queryText, [req.params.id])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making SELECT for patients:', error);
            res.sendStatus(500);
        });
});

module.exports = router;
