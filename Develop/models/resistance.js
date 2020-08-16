const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResistanceSchema = new Schema({
  type: String,
  name: String,
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number,

});

const Resistance = mongoose.model("Resistance", ResistanceSchema);

module.exports = Resistance;