/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { createMenteeCalls } = require('../src/dbQueries/createMenteeCalls');
const { deleteMenteeCalls } = require('../src/dbQueries/deleteMenteeCall');
const { getMenteeCalls } = require('../src/dbQueries/getMenteeCalls');
const { getMenteeGoals } = require('../src/dbQueries/getMenteeGoals');
const { getMentorCard } = require('../src/dbQueries/getMentorCard');
const { markGoalDOne } = require('../src/dbQueries/markGoalDone');
const { getUserFromSession } = require('../src/getUserFromSession');
const router  = express.Router();

module.exports = (db) => {
  router.get("/mentor-card", (req, res) => {
    const monthId = req.query.month_id;
    //const user = getUserFromSession(req.session);
    getMentorCard(db, monthId, '1').then((mentor) => {
      res.send(mentor);
    });
  });

  router.get("/mentee-calls", (req, res) => {
    const monthId = req.query.month_id;
    //const user = getUserFromSession(req.session);
    getMenteeCalls(db, monthId, '1').then((calls) => {
      res.send(calls);
    });
  });

  router.post("/mentee-call", (req, res) => {
    const monthId = req.body.month_id;
    //const user = getUserFromSession(req.session);
    createMenteeCalls(db, monthId, '1').then((calls) => {
      res.send(calls);
    });
  });

  router.delete("/mentee-call", (req, res) => {
    const callId = req.body.call_id;
    //const user = getUserFromSession(req.session);
    deleteMenteeCalls(db, callId, '1').then((calls) => {
      res.send(calls);
    });
  });

  router.get("/mentee-goals", (req, res) => {
    const goalId = req.query.goal_id;
    //const user = getUserFromSession(req.session);
    getMenteeGoals(db, goalId, '1').then((goals) => {
      res.send(goals);
    });
  });

  router.post("/mentee-goal-done", (req, res) => {
    const goalId = req.body.goal_id;
    //const user = getUserFromSession(req.session);
    markGoalDOne(db, goalId, '1').then((goals) => {
      res.send(goals);
    });
  });

  return router;
};
