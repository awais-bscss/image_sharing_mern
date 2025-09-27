import { Router } from "express";
import * as imageController from "../controller/image.controller.js";
const router = Router();

router.post("/upload", imageController.uploadImage);

export default router;
