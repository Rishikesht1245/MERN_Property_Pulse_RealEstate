import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
    },
    address: {
      type: String,
      required: [true, "Address is Required"],
    },
    regularPrice: {
      type: Number,
      required: [true, "Regular price is required"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Discount price is required"],
    },
    bathrooms: {
      type: Number,
      required: [true, "bathrooms is required"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Bedrooms is required"],
    },
    furnished: {
      type: Boolean,
      required: [true, "Furnished is required"],
    },
    parking: {
      type: Boolean,
      required: [true, "Parking is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    offer: {
      type: Boolean,
      required: [true, "Offer is Required"],
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
