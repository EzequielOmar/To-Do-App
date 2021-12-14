const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task: { type: String, required: false },
  done: { type: Boolean, required: false },
  folder: { type: String, required: false },
  fid: { type: String, required: false },
});

const Task = mongoose.model("Tasks", taskSchema);

module.exports = { Task };
