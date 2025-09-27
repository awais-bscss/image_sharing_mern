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

export const getAllImages = async (req, res) => {
  try {
    const allImages = await imageModel.find();

    if (!allImages.length) {
      return res.status(404).json({ message: "No image not found" });
    }
    res.status(200).json(allImages);
  } catch (error) {
    console.error("Error uploading image: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { newTitle } = req.body;
    const updateImage = await imageModel.findByIdAndUpdate(
      id,
      { title: newTitle },
      { new: true }
    );
    if (updateImage === null) {
      res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image Updated" });
  } catch (error) {
    console.error("Error uploading image: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedImage = await imageModel.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    await cloudinary.uploader.destroy(deletedImage.public_id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};
