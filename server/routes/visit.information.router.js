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
router.post('/', (req, res) => {
    console.log('POST request on /treatment-plan in treatment plan router');
    const { patient_id, visit_count, primary_complaint_area, primary_exercise_focus, secondary_exercise_focus, units } = req.body;
    const queryText = `INSERT INTO "treatment_plans" ("patient_id", "visit_count", "primary_complaint_area", "primary_exercise_focus", "secondary_exercise_focus", "units")
    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool
        .query(queryText, [patient_id, visit_count, primary_complaint_area, primary_exercise_focus, secondary_exercise_focus, units])
        .then((results) => res.sendStatus(201))
        .catch((error) => {
            console.log('Error making POST to treatment_plans:', error);
            res.sendStatus(500);
        });
});

// EDIT request to edit visit information
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

module.exports = router;