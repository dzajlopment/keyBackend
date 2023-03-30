import express from "express";
import rentHistoryController from "../controllers/rentHistoryController";

const router = express.Router();
router
    .route("/")
    .get(rentHistoryController.getAllRentHistories)
    .post(rentHistoryController.createRentHistory)

router
    .route("/:id")
    .get(rentHistoryController.getRentHistory)
    .delete(rentHistoryController.deleteRentHistory)
    .patch(rentHistoryController.patchRentHistory);

export default router;