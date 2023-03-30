import express from "express";
import keysController from "../controllers/keysController";

const router = express.Router();
router
    .route("/")
    .get(keysController.getAllKeys)
    .post(keysController.createKey)

router
    .route("/:id")
    .get(keysController.getKey)
	.delete(keysController.deleteKey)
	.patch(keysController.patchKey);

export default router;