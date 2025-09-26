import { Router } from "express";
const router = Router();
router.get("/test", (req, res) => {
  res.send("hello test");
});

export default router;
