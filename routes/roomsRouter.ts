import express from "express";
import roomsController from "../controllers/roomsController";

const router = express.Router();
router
    .route("/")
    .get(roomsController.getAllRooms)
    .post(roomsController.createRoom)

router
    .route("/:id")
    .get(roomsController.getRoom)
	.delete(roomsController.deleteRoom)
	.patch(roomsController.patchRoom);

export default router;