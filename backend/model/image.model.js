import mongoose from "mongoose";
import { Schema } from "mongoose";

const imageSchema = new Schema({
  title: String,
  imageUrl: String,
  public_id: String,
});

const Image = mongoose.model("ImageCollection", imageSchema);

export default Image;
