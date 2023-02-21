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

// EDIT request to edit a treatment plan
// router.put('/:id', rejectUnauthenticated, (req, res) => {
//     // endpoint functionality
//     const { description, image_url } = req.body;
//     console.log('in put route');
//     const qText = `UPDATE "item" SET "description" = $1, "image_url" = $2 WHERE "id" = $3 AND "user_id" = $4;`;
//     if (req.isAuthenticated()) {
//       pool
//         .query(qText, [description, image_url, req.params.id, req.user.id])
//         .then(response => {
//           res.sendStatus(204);
//         })
//         .catch(err => {
//           res.sendStatus(500);
//         });
//     } else {
//       res.sendStatus(403);
//     }
//   });
// Maybe a DELETE request to delete a treatment plan








module.exports = router;
