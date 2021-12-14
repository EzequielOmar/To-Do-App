var express = require("express");
var router = express.Router();
const taskController = require("../controllers/task-controller");

router.get("/", taskController.task_get_all_folders);

router.post("/:folderName", taskController.task_post_new_folder);

router.post("/:fid/:task", taskController.task_post_new);

router.get("/:fid", taskController.task_get_by_folder);

router.delete("/:fid", taskController.task_delete_folder);

router.delete("/:fid/:tid", taskController.task_delete_task);

router.patch("/:tid", taskController.task_update_task);

module.exports = router;
