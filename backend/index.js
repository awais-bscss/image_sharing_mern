import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import imageRoutes from "./routes/image.route.js";
import connectDB from "./db/db.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
