const { Task } = require("../models/task");

const task_get_all_folders = (req, res) => {
  Task.find({ folder: { $ne: null } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log("Error => " + err);
      res.status(400).send(`Hubo un error interno.`);
    });
};

const task_get_by_folder = (req, res) => {
  Task.find({ fid: req.params.fid })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log("Error => " + err);
      res.status(400).send(`Hubo un error interno.`);
    });
};

const task_post_new_folder = (req, res) => {
  const task = new Task();
  task.folder = req.params.folderName;
  task
    .save()
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((err) => {
      console.log("Error => " + err);
      res.status(400).send(`Hubo un error interno.`);
    });
};

const task_post_new = (req, res) => {
  const task = new Task();
  task.fid = req.params.fid;
  task.task = req.params.task;
  task.done = false;
  task
    .save()
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((err) => {
      console.log("Error => " + err);
      res.status(400).send(`Hubo un error interno.`);
    });
};

const task_delete_folder = (req, res) => {
  Task.deleteMany({ fid: req.params.fid })
    .then(() => {
      Task.deleteOne({ _id: req.params.fid }).then(() => {
        res.status(200).send("OK");
      });
    })
    .catch((err) => {
      console.log("Error => " + err);
      res.status(400).send(`Hubo un error interno.`);
    });
};

const task_delete_task = (req, res) => {
  Task.findByIdAndDelete({ _id: req.params.tid })
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((err) => {
      console.log("Error => " + err);
      res.status(400).send(`Hubo un error interno.`);
    });
};

const task_update_task = (req, res) => {
  Task.findByIdAndUpdate(
    req.params.tid,
    {
      $set: { task: req.body.task, done: req.body.done },
    },
    function (err) {
      if (err) {
        console.log("Error => " + err);
        res.status(400).send(`Hubo un error interno.`);
      }
      res.status(200).send("OK");
    }
  );
};

module.exports = {
  task_get_all_folders,
  task_get_by_folder,
  task_post_new_folder,
  task_post_new,
  task_delete_folder,
  task_delete_task,
  task_update_task,
};
