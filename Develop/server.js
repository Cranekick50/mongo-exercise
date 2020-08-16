const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

// create db
db.WorkoutPlan.create({ name: "Workout Plan" })
  .then(dbWorkoutPlan => {
    console.log(dbWorkoutPlan);
  })
  .catch(({message}) => {
    console.log(message);
  });

// submit exercise to dbWorkoutPlan
  app.post("/submit", ({body}, res) => {
    db.Exercise.create(body)
      .then(({_id}) => db.WorkoutPlan.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
      .then(dbWorkoutPlan => {
        res.json(dbWorkoutPlan);
      })
      .catch(err => {
        res.json(err);
      });
  });


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });