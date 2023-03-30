import express from "express";
import userController from "../controllers/userController";
import rentHistoryController from "../controllers/rentHistoryController";
import roomsController from "../controllers/roomsController";

const router = express.Router();
router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);

router
	.route("/:id")
	.get(userController.getUser)
	.delete(userController.deleteUser)
	.patch(userController.patchUser);

export default router;
