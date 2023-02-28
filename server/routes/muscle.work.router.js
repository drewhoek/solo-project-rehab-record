const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Select all muscle work from DB
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

router.get('/to-be-done/:id', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /muscle-work/to-be-done in muscle work router');
    const queryText = `SELECT "MWTBD"."id", "MWTBD"."muscle_work_id", "MWTBD"."treatment_plan_id", "MWB"."muscle_work_name", "MWB"."muscle_work_type" FROM "muscle_work_to_be_done" as "MWTBD"
    JOIN "muscle_work_bank" as "MWB" ON "MWTBD"."muscle_work_id" = "MWB"."id"
    WHERE "treatment_plan_id" = $1;`;
    pool
        .query(queryText, [req.params.id])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making SELECT for muscle work to be done:', error);
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


// ------------------- Muscle work to be done routes ------------------ //
router.get('/to-be-done-per-session/:planId', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /muscle-work/to-be-done in muscle work router');
    const queryText = `SELECT "muscle_work_to_be_done_per_visit"."id" AS "muscle_work_to_be_done_per_visit_id", "muscle_work_name", "muscle_work_type", "is_done", "visit_information"."id" AS "visit_id", "treatment_plans"."id" AS "treatment_plan_id" FROM "muscle_work_to_be_done_per_visit"
    JOIN "visit_information" ON "muscle_work_to_be_done_per_visit"."visit_information_id" = "visit_information"."id"
    JOIN "treatment_plans" ON "visit_information"."treatment_plan_id" = "treatment_plans"."id" 
    JOIN "muscle_work_to_be_done" ON "muscle_work_to_be_done_per_visit"."muscle_work_to_be_done_id" = "muscle_work_to_be_done"."id"
    JOIN "muscle_work_bank" ON "muscle_work_to_be_done"."muscle_work_id" = "muscle_work_bank"."id" WHERE "treatment_plans"."id" = $1;`;
    pool
        .query(queryText, [req.params.planId])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making SELECT for muscle work:', error);
            res.sendStatus(500);
        });
});


// router.post('/to-be-done', rejectUnauthenticated, async (req, res) => {
//     try {
//         const { muscle_work_id, treatment_plan_id, visit_information_id } = req.body;
//         const queryText = `INSERT INTO "muscle_work_to_be_done" ("muscle_work_id", "treatment_plan_id")
//         VALUES ($1, $2) RETURNING "muscle_work_to_be_done"."id";`;
//         const result = await pool.query(queryText, [muscle_work_id, treatment_plan_id]);

//         const queryText1 = `INSERT INTO "muscle_work_to_be_done_per_visit" ("muscle_work_to_be_done_id", "visit_information_id")
//         VALUES ($1, $2);`;
//         console.log(result.rows[0].id);
//         await pool.query(queryText1, [result.rows[0].id, visit_information_id]);
//         res.sendStatus(201);
//     } catch (err) {
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

router.post('/to-be-done', rejectUnauthenticated, (req, res) => {
    console.log('in post route for muscle work to be done');
    const { muscle_work_id, treatment_plan_id } = req.body;
    const queryText = `INSERT INTO "muscle_work_to_be_done" ("muscle_work_id", "treatment_plan_id")
    VALUES ($1, $2);`;
    pool
        .query(queryText, [muscle_work_id, treatment_plan_id])
        .then((results) => res.sendStatus(201))
        .catch((error) => {
            console.log('Error making POST to muscle work to be done:', error);
            res.sendStatus(500);
        });
});

router.post('/to-be-done-per-session', rejectUnauthenticated, (req, res) => {
    console.log('in post route for muscle work to be done per session');
    const { muscle_work_id_to_be_done_id, visit_information_id } = req.body;
    const queryText = `INSERT INTO "muscle_work_to_be_done_per_visit" ("muscle_work_id_to_be_done_id", "visit_information_id")
    VALUES ($1, $2);`;
    pool
        .query(queryText, [muscle_work_id_to_be_done_id, visit_information_id])
        .then((results) => res.sendStatus(201))
        .catch((error) => {
            console.log('Error making POST to muscle work to be done per session:', error);
            res.sendStatus(500);
        });
});

router.put('/to-be-done-per-session/:muscleWorkId', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /muscle-work/to-be-done in muscle work router');
    const queryText = `UPDATE "muscle_work_to_be_done_per_visit" SET "is_done"= NOT "is_done" WHERE "muscle_work_to_be_done_per_visit"."id" = $1;`;
    pool
        .query(queryText, [req.params.muscleWorkId])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('Error making PUT for muscle work:', error);
            res.sendStatus(500);
        });
});

module.exports = router;