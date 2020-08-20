const router = require ("express").Router()
const db = require("../models");
const { model } = require("../models/exercise");

// create db
// db.Workout.create({ name: "Workout Plan" })
//   .then(dbWorkout => {
//     console.log(dbWorkout);
//   })
//   .catch(({message}) => {
//     console.log(message);
//   });

  router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

// submit exercise to dbWorkout
  router.post("/api/workouts", (req, res) => {
    db.Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.put("/api/workouts/:id", ({body, params}, res) => {
    db.Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

// show full workout plan
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports=router;