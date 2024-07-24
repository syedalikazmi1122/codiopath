import { Schema, model } from "mongoose";

const ResourceSchema = new Schema({
  ResourceTitle: {
    type: String,
    required: true,
  },
  ResourceAverageRating: {
    type: Number,
    default: 0,
  },
  ResourceLink: {
    type: String,
    required: true,
    unique: true,
  },
  ResourceCategory: {
    type: String,
    required: true,
  },
  ResourceType: {
    type: String,
    required: true,
  },
  ResourceDescription: {
    type: String,
    required: true,
  },
  Posteremail: {
    type: String,
    required: true,
  },
  Postername: {
    type: String,
    required: true,
  },
  Reviews: [
    {
      review: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      reviewerEmail: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

export default model("Resources", ResourceSchema);
