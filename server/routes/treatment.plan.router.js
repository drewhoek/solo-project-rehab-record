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

// GET request to retrieve all info from patients specific information
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('GET request on /treatment-plan in treatment plan router');
    const queryText = `SELECT * FROM "treatment_plans" 
    JOIN "patients" ON "treatment_plans"."patient_id" = "patients"."id"
    WHERE "treatment_plans"."id" = $1;`;
    pool
        .query(queryText, [req.params.id])
        .then((results) => res.send(results.rows[0]))
        .catch((error) => {
            console.log('Error making SELECT for treatment plans:', error);
            res.sendStatus(500);
        });
});

// POST request to add a new treatment plan
router.post('/', (req, res) => {
    console.log('POST request on /treatment-plan in treatment plan router');
    const { patient_id, visit_count, primary_complaint_area, primary_exercise_focus, secondary_exercise_focus, notes_for_rehab, units } = req.body;
    const queryText = `INSERT INTO "treatment_plans" ("patient_id", "visit_count", "primary_complaint_area", "primary_exercise_focus", "secondary_exercise_focus", "notes_for_rehab", "units")
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool
        .query(queryText, [patient_id, visit_count, primary_complaint_area, primary_exercise_focus, secondary_exercise_focus, notes_for_rehab, units])
        .then((results) => res.sendStatus(201))
        .catch((error) => {
            console.log('Error making POST to treatment_plans:', error);
            res.sendStatus(500);
        });
});

// EDIT request to edit a treatment plan
router.put('/:id', rejectUnauthenticated, (req, res) => {
    // endpoint functionality
    const { visit_count, primary_complaint_area, primary_exercise_focus, secondary_exercise_focus, units, coconut_allergy } = req.body;
    console.log('in put route');
    const queryText = `UPDATE "treatment_plans" SET "visit_count" = $1, "primary_complaint_area" = $2, "primary_exercise_focus" = $3, "secondary_exercise_focus" = $4, "units" = $5, "coconut_allergy" = $6 WHERE "id" = $7;`;
    pool
        .query(queryText, [visit_count, primary_complaint_area, primary_exercise_focus, secondary_exercise_focus, units, coconut_allergy, req.params.id])
        .then(response => {
            res.sendStatus(204);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

// Maybe a DELETE request to delete a treatment plan
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // endpoint functionality
    console.log('in delete route');
    const queryText = `DELETE FROM "treatment_plans" WHERE "id" = $1;`;
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
