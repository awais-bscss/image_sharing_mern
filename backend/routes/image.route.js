import { Router } from "express";
import * as imageController from "../controller/image.controller.js";
const router = Router();

router.post("/upload", imageController.uploadImage);
router.get("/allImages", imageController.getAllImages);
router.put("/image/:id", imageController.updateImage);
router.delete("/delete/:id", imageController.deleteImage);

export default router;
