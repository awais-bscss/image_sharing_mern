import { v2 as cloudinary } from "cloudinary";
import imageModel from "../model/image.model.js";

export const uploadImage = async (req, res) => {
  try {
    const { imageUrl, title } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "image not found" });
    }

    // Cloudinary upload
    const result = await cloudinary.uploader.upload(imageUrl);
    console.log("Cloudinary Result: ", result);

    // Save to MongoDB
    const newImage = new imageModel({
      title,
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });
    await newImage.save();

    res.status(200).json({
      message: "Image uploaded successfully",
      data: newImage,
    });
  } catch (error) {
    console.error("Error uploading image: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};
