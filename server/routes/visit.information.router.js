const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET request to retrieve all previous visits
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /visit-information in visit information router');
    const queryText = `SELECT * FROM "visit_information";`;
    pool
        .query(queryText)
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making SELECT for visit information:', error);
            res.sendStatus(500);
        });
});

// GET request to retrieve all previous visits for specific patient
router.get('/patient', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /visit-information for specific patient in visit information router');
    const { treatment_plan_id } = req.body;
    const queryText = `SELECT * FROM "visit_information" WHERE "treatment_plan_id" = $1;`;
    pool
        .query(queryText, [treatment_plan_id])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making SELECT for specific patients visit information:', error);
            res.sendStatus(500);
        });
});

// POST request to add a new visit
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('POST request on in visit information router');
    const { date, time_in, time_out, total_time, exercise_notes, muscle_work_notes, therapist, units_completed, treatment_plan_id } = req.body;
    const queryText = `INSERT INTO "visit_information" ("date", "time_in", "time_out", "total_time", "exercise_notes", "muscle_work_notes", "therapist", "units_completed", "treatment_plan_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    pool
        .query(queryText, [date, time_in, time_out, total_time, exercise_notes, muscle_work_notes, therapist, units_completed, treatment_plan_id])
        .then((results) => res.sendStatus(201))
        .catch((error) => {
            console.log('Error making POST to visit_information:', error);
            res.sendStatus(500);
        });
});

// EDIT request to edit visit information
router.put('/:id', rejectUnauthenticated, (req, res) => {
    // endpoint functionality
    const { date, time_in, time_out, total_time, exercise_notes, muscle_work_notes, therapist, units_completed, treatment_plan_id } = req.body;
    console.log('in put route');
    const queryText = `UPDATE "visit_information" SET "date" = $1, "time_in" = $2, "time_out" = $3, "total_time" = $4, "exercise_notes" = $5, "muscle_work_notes" = $6, "therapist" = $7, "units_completed" = $8, "treatment_plan_id" = $9 WHERE "id" = $10;`;
    pool
        .query(queryText, [date, time_in, time_out, total_time, exercise_notes, muscle_work_notes, therapist, units_completed, treatment_plan_id, req.params.id])
        .then(response => {
            res.sendStatus(204);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

// DELETE request to delete visit information
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // endpoint functionality
    console.log('in delete route');
    const queryText = `DELETE FROM "visit_information" WHERE "id" = $1`;
    pool
        .query(queryText, [req.params.id])
        .then(response => {
            res.sendStatus(204);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});



module.exports = router;