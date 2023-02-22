const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Select all exercises from DB
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /muscle-work in muscle work router');
    const queryText = `SELECT "id", "muscle_work_name", "muscle_work_type" FROM "muscle_work_bank";`;
    pool
        .query(queryText)
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making SELECT for muscle work:', error);
            res.sendStatus(500);
        });
});

// POST request to add new muscle work
router.post('/', (req, res) => {
    console.log('POST request on /muscle-work in muscle work router');
    const { muscle_work_name, muscle_work_type } = req.body;
    const queryText = `INSERT INTO "muscle_work_bank" ("muscle_work_name", "muscle_work_type") VALUES ($1, $2);`;
    pool
        .query(queryText, [muscle_work_name, muscle_work_type])
        .then((results) => res.sendStatus(201))
        .catch((error) => {
            console.log('Error making POST to muscle work:', error);
            res.sendStatus(500);
        });
});

// EDIT request to edit muscle work information
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in put route');
    const { muscle_work_name, muscle_work_type } = req.body;
    const queryText = `UPDATE "muscle_work_bank" SET "muscle_work_name" = $1, "muscle_work_type" = $2 WHERE "id" = $3;`;
    pool
        .query(queryText, [muscle_work_name, muscle_work_type, req.params.id])
        .then((results) => res.sendStatus(204))
        .catch((error) => {
            console.log('Error making PUT to patients:', error);
            res.sendStatus(500);
        });
});

// DELETE request to delete patient information
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in delete route');
    const queryText = `DELETE FROM "muscle_work_bank" WHERE "id" = $1;`;
    pool
        .query(queryText, [req.params.id])
        .then((results) => res.sendStatus(204))
        .catch((error) => {
            console.log('Error making PUT to patients:', error);
            res.sendStatus(500);
        });
});

module.exports = router;