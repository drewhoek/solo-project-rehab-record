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

// GET request to retrieve previous visit for specific patient
router.get('/patient-recent-visit/:treatmentId', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /visit-information for specific patients last visit in visit information router');
    const treatmentId = req.params.treatmentId;
    const queryText = `SELECT * FROM "visit_information" 
    JOIN "user" ON "visit_information"."therapist" = "user"."id"
    WHERE "treatment_plan_id" = $1 
    ORDER BY "date" DESC LIMIT 1;
    `;
    pool
        .query(queryText, [treatmentId])
        .then((results) => res.send(results.rows[0]))
        .catch((error) => {
            console.log('Error making SELECT for specific patients last visit information:', error);
            res.sendStatus(500);
        });
});

// POST request to add a new visit
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('POST request on in visit information router');
    try {
        const { treatment_plan_id, array_of_muscle_work_ids } = req.body;
        const queryText = `INSERT INTO "visit_information" ("therapist", "treatment_plan_id")
        VALUES ($1, $2) RETURNING "visit_information"."id";`;
        const result = await pool.query(queryText, [req.user.id, treatment_plan_id]);

        const queryText1 = `INSERT INTO "muscle_work_to_be_done_per_visit" ("muscle_work_to_be_done_id", "visit_information_id")
        VALUES ($1, $2);`;

        for (const id of array_of_muscle_work_ids) {
            await pool.query(queryText1, [Number(id), Number(result.rows[0].id)]);
        }
        res.send(result.rows[0]).status(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});







// EDIT request to edit visit information
router.put('/:id', rejectUnauthenticated, (req, res) => {
    // endpoint functionality
    const { date, time_in, time_out, total_time, units_completed } = req.body;
    console.log('in put route');
    const queryText = `UPDATE "visit_information" SET "date" = $1, "time_in" = $2, "time_out" = $3, "total_time" = $4, "units_completed" = $5 WHERE "id" = $6;`;
    console.log('this should be total units', units_completed);
    pool
        .query(queryText, [date, time_in, time_out, total_time, units_completed, req.params.id])
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